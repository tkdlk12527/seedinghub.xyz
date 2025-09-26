import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const limit = 10; // Same limit as the main deals page

  try {
    // First, get the created_at of the specific deal
    const { data: currentDeal, error: currentDealError } = await supabase
      .from('Deals')
      .select('created_at')
      .eq('deal_id', id)
      .single();

    if (currentDealError) {
      console.error('Error fetching deal:', currentDealError);
      if (currentDealError.code === 'PGRST116') { // "Not a single row was returned"
        return NextResponse.json({ error: "Deal not found" }, { status: 404 });
      }
      throw currentDealError;
    }

    // Then, count how many deals are newer than this one
    const { count, error: countError } = await supabase
      .from('Deals')
      .select('*', { count: 'exact', head: true })
      .gt('created_at', currentDeal.created_at);

    if (countError) {
      throw countError;
    }

    const dealIndex = count ?? 0;
    const page = Math.floor(dealIndex / limit) + 1;

    return NextResponse.json({ page });

  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Failed to get deal position" }, { status: 500 });
  }
}