import { Link } from "react-router-dom"
import { ArrowRight, Heart, Calendar, TrendingUp, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DealStats } from "./deal-stats"
import { useStats } from "@/contexts/stats-provider"

export function SiteHeader() {
  const { stats } = useStats()

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 md:px-6 py-3">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between gap-4">
          {/* Logo - Left Side */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="inline-block font-extrabold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">SeedingHub</span>
          </Link>

          {/* Center - Deal Stats */}
          <div className="flex">
            <DealStats />
          </div>

          {/* CTA Buttons - Right Side */}
          <div className="flex items-center gap-3">
            {/* Telegram Button */}
            <a href="https://t.me/+UzSS1v4tWLlhMjU1" target="_blank" rel="noopener noreferrer">
              <Button
                size="sm"
                className="bg-[#0088CC] hover:bg-[#0077B3] text-white flex items-center gap-2 text-xs px-3.5 py-1.5 h-9 rounded-lg font-medium shadow-sm"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/330px-Telegram_2019_Logo.svg.png"
                  alt="Telegram"
                  className="w-4 h-4 object-contain"
                />
                <span>Tham gia Telegram</span>
                <ArrowRight className="w-3 h-3 opacity-80" />
              </Button>
            </a>

            {/* Facebook Button */}
            <a href="https://www.facebook.com/groups/seedingreviewer" target="_blank" rel="noopener noreferrer">
              <Button
                size="sm"
                className="bg-[#1877F2] hover:bg-[#166FE5] text-white flex items-center gap-2 text-xs px-3.5 py-1.5 h-9 rounded-lg font-medium shadow-sm"
              >
                <Facebook className="w-4 h-4 fill-white text-transparent" />
                <span>Theo dõi Group</span>
              </Button>
            </a>
          </div>
        </div>

        {/* Mobile Layout - Optimized Icons */}
        <div className="md:hidden">
          {/* Main Header Row */}
          <div className="flex items-center justify-between py-1">
            {/* Left: Logo */}
            <Link to="/" className="flex items-center">
              <div className="px-3.5 py-1.5 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm tracking-wide">SeedingHub</span>
              </div>
            </Link>

            {/* Right: Social Icons */}
            <div className="flex items-center gap-0.5">
              {/* Telegram Icon */}
              <a href="https://t.me/+UzSS1v4tWLlhMjU1" target="_blank" rel="noopener noreferrer" className="p-1 block">
                <div className="w-9 h-9 bg-gradient-to-br from-[#0088CC] to-[#0077B3] rounded-xl flex items-center justify-center shadow-md active:scale-95 transition-transform">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/330px-Telegram_2019_Logo.svg.png"
                    alt="Telegram"
                    className="w-4.5 h-4.5"
                  />
                </div>
              </a>

              {/* Zalo Icon */}
              <a href="https://zalo.me/g/vdbfse702" target="_blank" rel="noopener noreferrer" className="p-1 block">
                <div className="w-9 h-9 bg-gradient-to-br from-[#0068FF] to-[#0050C8] rounded-xl flex items-center justify-center shadow-md active:scale-95 transition-transform">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                    <path d="M12.002 2C6.479 2 2 6.03 2 11c0 2.81 1.428 5.29 3.666 6.858-.198 1.508-1.044 3.816-1.044 3.816s2.24-.146 4.254-1.6c1.002.316 2.05.476 3.126.476 5.523 0 10-4.03 10-9s-4.477-9-10-9zm-4.32 12.392H6.046V9.06h3.636v.936H7.172v1.17h2.24v.936H7.172v1.354h2.51v.936zm4.12 0h-3.15V9.06h1.126v4.396h2.024v.936zm4.336 0h-1.126V9.06h1.126v5.332zm3.326.096c-1.636 0-2.618-1.196-2.618-2.766s.982-2.766 2.618-2.766c1.638 0 2.62 1.196 2.62 2.766s-.982 2.766-2.62 2.766zm0-.96c.928 0 1.464-.78 1.464-1.806s-.536-1.806-1.464-1.806c-.926 0-1.462.78-1.462 1.806s.536 1.806 1.462 1.806z" />
                  </svg>
                </div>
              </a>

              {/* Facebook Icon */}
              <a href="https://www.facebook.com/seedinghub.vn" target="_blank" rel="noopener noreferrer" className="p-1 block">
                <div className="w-9 h-9 bg-gradient-to-br from-[#1877F2] to-[#166FE5] rounded-xl flex items-center justify-center shadow-md active:scale-95 transition-transform">
                  <Facebook className="w-4.5 h-4.5 fill-white text-transparent" />
                </div>
              </a>
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
