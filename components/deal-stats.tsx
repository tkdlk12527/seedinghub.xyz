"use client"

import { useState, useEffect } from "react"
import { TrendingUp, Calendar } from "lucide-react"

interface DealStats {
  totalDeals: number
  todayDeals: number
}

export function DealStats() {
  const [stats, setStats] = useState<DealStats>({ totalDeals: 0, todayDeals: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/d/stats")
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        console.error("Failed to fetch deal stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()

    // Update stats every 30 seconds for real-time updates
    const interval = setInterval(fetchStats, 30000)

    return () => clearInterval(interval)
  }, [])

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
