"use client"

import { useState, useEffect } from "react"
import { TrendingUp, Calendar } from "lucide-react"

interface DealStats {
  totalDeals: number
  todayDeals: number
}

export function MobileDealStats() {
  const [stats, setStats] = useState<DealStats>({ totalDeals: 0, todayDeals: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/deals/stats")
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
      <div className="flex items-center gap-2">
        <div className="animate-pulse bg-gray-200 rounded-lg p-2 w-12 h-16"></div>
        <div className="animate-pulse bg-gray-200 rounded-lg p-2 w-12 h-16"></div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      {/* Today's Deals Icon */}
      <div className="flex flex-col items-center bg-green-50 rounded-lg p-2 border border-green-100 shadow-sm min-w-[50px]">
        <Calendar className="w-4 h-4 text-green-600 mb-1" />
        <div className="text-xs font-bold text-green-700">{stats.todayDeals}</div>
      </div>

      {/* Total Deals Icon */}
      <div className="flex flex-col items-center bg-purple-50 rounded-lg p-2 border border-purple-100 shadow-sm min-w-[50px]">
        <TrendingUp className="w-4 h-4 text-purple-600 mb-1" />
        <div className="text-xs font-bold text-purple-700">{stats.totalDeals}</div>
      </div>
    </div>
  )
}
