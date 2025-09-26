import { NextResponse, type NextRequest } from "next/server"
import { createClient } from "@supabase/supabase-js"

export const revalidate = 3600; // Cache for 60 minutes

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Use service role key for server-side operations
const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function GET(request: NextRequest) {
  console.log("Attempting to fetch deals...");
  console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);

  const searchParams = request.nextUrl.searchParams
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = 10;
  const offset = (page - 1) * limit;
  const excludeId = searchParams.get('exclude');

  try {
    let query = supabase
      .from("Deals")
      .select(`
        deal_id,
        Content,
        displayedViews,
        "Link Facebook",
        created_at
      `)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1)

    if (excludeId) {
      query = query.neq('deal_id', excludeId)
    }

    const { data: deals, error } = await query

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to fetch deals", details: error.message }, { status: 500 })
    }

    console.log("Deals fetched from Supabase:", deals);

    // Transform data and add random offset to contact_count
    const transformedDeals =
      deals?.map((deal) => {
        const baseContactCount = deal.displayedViews || 0
        const randomOffset = Math.floor(Math.random() * (50 - 20 + 1)) + 20 // Random number between 20 and 50
        const totalContactCount = baseContactCount + randomOffset

        return {
          deal_id: deal.deal_id,
          content: deal.Content,
          contact_count: totalContactCount,
          facebook_link: deal["Link Facebook"],
          created_at: deal.created_at,
        }
      }) || []
    
    console.log("Transformed deals:", transformedDeals);

    return NextResponse.json(transformedDeals)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch deals", details: error.message }, { status: 500 })
  }
}