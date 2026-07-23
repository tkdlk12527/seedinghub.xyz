import { Link } from "react-router-dom"
import { ArrowRight, Heart, TrendingUp, Facebook } from "lucide-react"
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

          {/* CTA Boxes - Right Side */}
          <div className="flex items-center gap-2">
            {/* Telegram CTA Box */}
            <div className="flex items-center gap-1.5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg px-2.5 py-1.5 border border-blue-100 shadow-sm">
              <div className="flex-shrink-0 w-5 h-5 rounded-full overflow-hidden">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/330px-Telegram_2019_Logo.svg.png"
                  alt="Telegram"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <a href="https://t.me/+Hqiyu9DN-tg1OWU1" target="_blank" rel="noopener noreferrer">
                <Button
                  size="sm"
                  className="bg-[#0088CC] hover:bg-[#0077B3] text-white flex items-center gap-1 text-xs px-2 py-1"
                >
                  <span className="hidden lg:inline">nhóm Telegram</span>
                  <span className="lg:hidden">Telegram</span>
                  <ArrowRight className="w-3 h-3" />
                </Button>
              </a>
            </div>

            {/* Zalo CTA Box */}
            <div className="flex items-center gap-1.5 bg-gradient-to-r from-blue-50 to-sky-50 rounded-lg px-2.5 py-1.5 border border-blue-100 shadow-sm">
              <div className="flex-shrink-0 w-5 h-5 rounded-full overflow-hidden">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/330px-Icon_of_Zalo.svg.png"
                  alt="Zalo"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <a href="https://zalo.me/g/vdbfse702" target="_blank" rel="noopener noreferrer">
                <Button
                  size="sm"
                  className="bg-[#0068FF] hover:bg-[#0050C8] text-white flex items-center gap-1 text-xs px-2 py-1"
                >
                  <span className="hidden lg:inline">nhóm Zalo</span>
                  <span className="lg:hidden">Zalo</span>
                  <ArrowRight className="w-3 h-3" />
                </Button>
              </a>
            </div>

            {/* Facebook CTA Box */}
            <div className="flex items-center gap-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg px-2.5 py-1.5 border border-blue-100 shadow-sm">
              <div className="flex-shrink-0 w-5 h-5">
                <svg viewBox="0 0 24 24" className="w-full h-full fill-[#1877F2]">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              
              <a href="https://www.facebook.com/groups/2542746036079186/" target="_blank" rel="noopener noreferrer">
                <Button
                  size="sm"
                  className="bg-[#1877F2] hover:bg-[#166FE5] text-white flex items-center gap-1 text-xs px-2 py-1"
                >
                  <Heart className="w-3 h-3" />
                  <span className="hidden lg:inline">Nhóm Facebook</span>
                  <span className="lg:hidden">Facebook</span>
                </Button>
              </a>
            </div>
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
            <div className="flex items-center gap-1">
              {/* Telegram Icon */}
              <a href="https://t.me/+Hqiyu9DN-tg1OWU1" target="_blank" rel="noopener noreferrer" className="p-1 block">
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
              <a href="https://www.facebook.com/groups/2542746036079186/" target="_blank" rel="noopener noreferrer" className="p-1 block">
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
