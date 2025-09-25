import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params
  try {
    const { data: deal, error } = await supabase
      .from("Deals")
      .select(`
        deal_id,
        Content,
        displayedViews,
        "Link Facebook",
        created_at
      `)
      .eq('deal_id', id)
      .single()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to fetch deal" }, { status: 500 })
    }

    if (!deal) {
      return NextResponse.json({ error: "Deal not found" }, { status: 404 })
    }
    
    const baseContactCount = deal.displayedViews || 0
    const randomOffset = Math.floor(Math.random() * (50 - 20 + 1)) + 20
    const totalContactCount = baseContactCount + randomOffset

    const transformedDeal = {
      deal_id: deal.deal_id,
      content: deal.Content,
      contact_count: totalContactCount,
      facebook_link: deal["Link Facebook"],
      created_at: deal.created_at,
    }

    return NextResponse.json(transformedDeal)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch deal" }, { status: 500 })
  }
}
