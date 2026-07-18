import { createContext, useContext, ReactNode } from "react"
import { getAllDeals, RawDeal } from "@/lib/deals"

interface IDealStats {
  totalDeals: number
  todayDeals: number
}

interface StatsContextType {
  stats: IDealStats
  loading: boolean
}

// Tính thẳng từ JSON — không cần fetch, không cần useEffect
function computeStats(deals: RawDeal[]): IDealStats {
  const now = new Date()
  const todayVN = new Date(now.getTime() + 7 * 60 * 60 * 1000)
  todayVN.setUTCHours(0, 0, 0, 0)
  const tomorrowVN = new Date(todayVN.getTime() + 24 * 60 * 60 * 1000)

  const todayDeals = deals.filter((deal) => {
    const createdAt = new Date(deal.time)
    return createdAt >= todayVN && createdAt < tomorrowVN
  }).length

  return { totalDeals: deals.length, todayDeals }
}

const STATS = computeStats(getAllDeals())

const StatsContext = createContext<StatsContextType>({
  stats: STATS,
  loading: false,
})

export function StatsProvider({ children }: { children: ReactNode }) {
  return (
    <StatsContext.Provider value={{ stats: STATS, loading: false }}>
      {children}
    </StatsContext.Provider>
  )
}

export function useStats() {
  return useContext(StatsContext)
}
