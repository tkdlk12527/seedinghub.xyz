"use client"

import Link from "next/link"
import { ArrowRight, Heart, Calendar, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DealStats } from "./deal-stats"
import { useStats } from "@/contexts/stats-provider"

export function SiteHeader() {
  const { stats, loading } = useStats()

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 md:px-6 py-3">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between gap-4">
          {/* Logo - Left Side */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-xl text-gray-800">Seeding Hub</span>
          </Link>

          {/* Center - Deal Stats */}
          <div className="flex">
            <DealStats />
          </div>

          {/* CTA Boxes - Right Side */}
          <div className="flex items-center gap-3">
            {/* Telegram CTA Box */}
            <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg px-3 py-2 border border-blue-100 shadow-sm">
              <div className="flex-shrink-0 w-6 h-6 rounded-full overflow-hidden">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/330px-Telegram_2019_Logo.svg.png"
                  alt="Telegram"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <Link href="https://t.me/+UzSS1v4tWLlhMjU1" target="_blank" rel="noopener noreferrer">
                <Button
                  size="sm"
                  className="bg-[#0088CC] hover:bg-[#0077B3] text-white flex items-center gap-1 text-xs px-2 py-1"
                >
                  <span className="hidden md:inline">Tham gia nhóm Telegram</span>
                  <span className="md:hidden">Join</span>
                  <ArrowRight className="w-3 h-3" />
                </Button>
              </Link>
            </div>

            {/* Facebook CTA Box */}
            <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg px-3 py-2 border border-blue-100 shadow-sm">
              <div className="flex-shrink-0 w-6 h-6 rounded-full overflow-hidden">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/100px-Facebook_f_logo_%282019%29.svg.png"
                  alt="Facebook"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <Link href="https://www.facebook.com/seedinghub.vn" target="_blank" rel="noopener noreferrer">
                <Button
                  size="sm"
                  className="bg-[#1877F2] hover:bg-[#166FE5] text-white flex items-center gap-1 text-xs px-2 py-1"
                >
                  <Heart className="w-3 h-3" />
                  <span className="hidden md:inline">Theo dõi Page</span>
                  <span className="md:hidden">Like</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Layout - Optimized Icons */}
        <div className="md:hidden">
          {/* Main Header Row */}
          <div className="grid grid-cols-2 items-center py-1">
            {/* Left: Logo */}
            <div className="flex justify-center">
                <Link href="/d" className="flex items-center">
                <div className="w-30 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-base">SeedingHub</span>
                </div>
                </Link>
            </div>

            {/* Right: Social Icons */}
            <div className="grid grid-cols-3 gap-1 items-center">
                {/* Telegram Icon */}
                <Link href="https://t.me/+UzSS1v4tWLlhMjU1" target="_blank" rel="noopener noreferrer" className="flex justify-center">
                <div className="w-9 h-9 bg-gradient-to-br from-[#0088CC] to-[#0077B3] rounded-xl flex items-center justify-center shadow-lg active:scale-95 transition-transform">
                    <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/330px-Telegram_2019_Logo.svg.png"
                    alt="Telegram"
                    className="w-5 h-5"
                    />
                </div>
                </Link>
                
                {/* Zalo Icon */}
                <Link href="https://zalo.me/g/vdbfse702" target="_blank" rel="noopener noreferrer" className="flex justify-center">
                <div className="w-9 h-9 bg-gradient-to-br from-[#0088CC] to-[#0077B3] rounded-xl flex items-center justify-center shadow-lg active:scale-95 transition-transform">
                    <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/330px-Icon_of_Zalo.svg.png"
                    alt="Zalo"
                    className="w-5 h-5"
                    />
                </div>
                </Link>

                {/* Facebook Icon */}
                <Link href="https://www.facebook.com/seedinghub.vn" target="_blank" rel="noopener noreferrer" className="flex justify-center">
                <div className="w-9 h-9 bg-gradient-to-br from-[#1877F2] to-[#166FE5] rounded-xl flex items-center justify-center shadow-lg active:scale-95 transition-transform">
                    <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/100px-Facebook_f_logo_%282019%29.svg.png"
                    alt="Facebook"
                    className="w-5 h-5"
                    />
                </div>
                </Link>
            </div>
          </div>

          {/* Optional: Quick Stats Bar */}
          <div className="flex items-center justify-center mt-2 py-1.5 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg border border-gray-100">
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>{stats.todayDeals} deal hôm nay</span>
              </div>
              <div className="w-px h-3 bg-gray-300"></div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-blue-500" />
                <span>{stats.totalDeals} công việc</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}