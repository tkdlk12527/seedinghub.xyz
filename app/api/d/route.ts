import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Use service role key for server-side operations
const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function GET() {
  try {
    const { data: deals, error } = await supabase
      .from("Deals")
      .select(`
        deal_id,
        Content,
        displayedViews,
        "Link Facebook",
        created_at
      `)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to fetch deals" }, { status: 500 })
    }

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

    return NextResponse.json(transformedDeals)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch deals" }, { status: 500 })
  }
}
