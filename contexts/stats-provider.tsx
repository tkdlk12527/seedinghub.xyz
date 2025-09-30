"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface IDealStats {
  totalDeals: number
  todayDeals: number
}

interface StatsContextType {
  stats: IDealStats
  loading: boolean
}

const StatsContext = createContext<StatsContextType | undefined>(undefined)

export function StatsProvider({ children }: { children: ReactNode }) {
  const [stats, setStats] = useState<IDealStats>({ totalDeals: 0, todayDeals: 0 })
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

    // Poll every 60 minutes
    const interval = setInterval(fetchStats, 3600000)

    return () => clearInterval(interval)
  }, [])

  return (
    <StatsContext.Provider value={{ stats, loading }}>
      {children}
    </StatsContext.Provider>
  )
}

export function useStats() {
  const context = useContext(StatsContext)
  if (context === undefined) {
    throw new Error("useStats must be used within a StatsProvider")
  }
  return context
}
