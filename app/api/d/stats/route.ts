import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export const revalidate = 3600; // Cache for 60 minutes

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function GET() {
  try {
    // Get total deals count
    const { count: totalDeals, error: totalError } = await supabase
      .from("Deals")
      .select("*", { count: "exact", head: true })

    if (totalError) {
      console.error("Supabase total count error:", totalError)
      return NextResponse.json({ error: "Failed to fetch total deals count" }, { status: 500 })
    }

    // Get today's deals count (deals created today)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const { count: todayDeals, error: todayError } = await supabase
      .from("Deals")
      .select("*", { count: "exact", head: true })
      .gte("created_at", today.toISOString())
      .lt("created_at", tomorrow.toISOString())

    if (todayError) {
      console.error("Supabase today count error:", todayError)
      return NextResponse.json({ error: "Failed to fetch today's deals count" }, { status: 500 })
    }

    return NextResponse.json({
      totalDeals: totalDeals || 0,
      todayDeals: todayDeals || 0,
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch deal statistics" }, { status: 500 })
  }
}
