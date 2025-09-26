import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(request: Request, context: { params: { id: string } }) {
  try {
    const dealId = context.params.id

    // First, get the current displayedViews value
    const { data: currentData, error: fetchError } = await supabase
      .from("Deals")
      .select("displayedViews")
      .eq("deal_id", dealId)
      .single()

    if (fetchError) {
      console.error("Supabase fetch error:", fetchError)
      return NextResponse.json({ error: "Failed to fetch current contact count" }, { status: 500 })
    }

    // Ensure we're working with a number and increment by exactly 1
    const currentCount = Number.parseInt(currentData?.displayedViews?.toString() || "0", 10)
    const newCount = currentCount + 1

    const { data, error } = await supabase
      .from("Deals")
      .update({ displayedViews: newCount })
      .eq("deal_id", dealId)
      .select("displayedViews")

    if (error) {
      console.error("Supabase update error:", error)
      return NextResponse.json({ error: "Failed to update contact count" }, { status: 500 })
    }

    return NextResponse.json({ success: true, data, newCount })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to update contact count" }, { status: 500 })
  }
}