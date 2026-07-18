/**
 * Data access layer cho deals.
 *
 * Dữ liệu được load từ data/deals-index.json — file này được sinh tự động
 * trước mỗi lần build/dev bởi scripts/build-index.ts.
 * Không có filesystem I/O lúc runtime.
 */
import dealsIndex from "@/data/deals-index.json"

export interface RawDeal {
  id: number
  messenger_id?: string
  profilePic?: string
  text: string
  url: string
  time: string
}

export interface Deal {
  deal_id: string
  content: string
  contact_count: number
  facebook_link: string
  created_at: string
  profilePic?: string
  messenger_id?: string
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
  return DEALS.find((d) => d.id.toString() === id)
}

/**
 * Transform RawDeal sang Deal (thêm random offset cho contact_count)
 */
export function transformDeal(deal: RawDeal): Deal {
  const baseContactCount = 0
  const randomOffset = Math.floor(Math.random() * (50 - 20 + 1)) + 20
  return {
    deal_id: deal.id.toString(),
    content: deal.text,
    contact_count: baseContactCount + randomOffset,
    facebook_link: deal.url,
    created_at: deal.time,
    profilePic: deal.profilePic,
    messenger_id: deal.messenger_id,
  }
}
