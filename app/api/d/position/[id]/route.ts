import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const limit = 10; // Same limit as the main deals page

  try {
    // Fetch all deal_ids ordered by creation date
    const { data: allDeals, error } = await supabase
      .from("Deals")
      .select("deal_id")
      .order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    // Find the index of the requested deal
    const dealIndex = allDeals.findIndex(deal => deal.deal_id === id)

    if (dealIndex === -1) {
      return NextResponse.json({ error: "Deal not found" }, { status: 404 })
    }

    // Calculate the page number
    const page = Math.floor(dealIndex / limit) + 1

    return NextResponse.json({ page })

  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to get deal position" }, { status: 500 })
  }
}
