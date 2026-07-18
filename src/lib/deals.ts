/**
 * Data access layer cho deals.
 *
 * Dữ liệu được load từ data/deals-index.json — file này được sinh tự động
 * trước mỗi lần build/dev bởi scripts/build-index.ts.
 * Không có filesystem I/O lúc runtime.
 */
import dealsIndex from "@/data/deals-index.json"

export interface RawDeal {
  deal_id: string
  Content: string
  displayedViews: number
  "Link Facebook": string
  created_at: string
}

export interface Deal {
  deal_id: string
  content: string
  contact_count: number
  facebook_link: string
  created_at: string
}

// Cast một lần duy nhất ở module level
const DEALS = dealsIndex as RawDeal[]

/**
 * Trả về toàn bộ deals đã được sort sẵn (mới nhất trước).
 */
export function getAllDeals(): RawDeal[] {
  return DEALS
}

/**
 * Tìm một deal theo deal_id
 */
export function getDealById(id: string): RawDeal | undefined {
  return DEALS.find((d) => d.deal_id === id)
}

/**
 * Transform RawDeal sang Deal (thêm random offset cho contact_count)
 */
export function transformDeal(deal: RawDeal): Deal {
  const baseContactCount = deal.displayedViews || 0
  const randomOffset = Math.floor(Math.random() * (50 - 20 + 1)) + 20
  return {
    deal_id: deal.deal_id,
    content: deal.Content,
    contact_count: baseContactCount + randomOffset,
    facebook_link: deal["Link Facebook"],
    created_at: deal.created_at,
  }
}
