import { TrendingUp, Calendar } from "lucide-react"
import { useStats } from "@/contexts/stats-provider"

export function DealStats() {
  const { stats, loading } = useStats()

  if (loading) {
    return (
      <div className="flex items-center gap-4">
        <div className="animate-pulse bg-gray-200 rounded-lg px-3 py-2 w-24 h-10"></div>
        <div className="animate-pulse bg-gray-200 rounded-lg px-3 py-2 w-24 h-10"></div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      {/* Today's Deals */}
      <div className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg px-3 py-2 border border-green-100 shadow-sm">
        <Calendar className="w-4 h-4 text-green-600" />
        <div className="text-center">
          <div className="text-sm font-bold text-green-700">{stats.todayDeals}</div>
          <div className="text-xs text-green-600">Hôm nay</div>
        </div>
      </div>

      {/* Total Deals */}
      <div className="flex items-center gap-2 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg px-3 py-2 border border-purple-100 shadow-sm">
        <TrendingUp className="w-4 h-4 text-purple-600" />
        <div className="text-center">
          <div className="text-sm font-bold text-purple-700">{stats.totalDeals}</div>
          <div className="text-xs text-purple-600">Tổng cộng</div>
        </div>
      </div>
    </div>
  )
}
