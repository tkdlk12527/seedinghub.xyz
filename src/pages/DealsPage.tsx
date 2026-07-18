import { useState, useEffect, useRef, useCallback } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { DealCard } from "@/components/deal-card"
import { Button } from "@/components/ui/button"
import { getAllDeals, transformDeal, Deal } from "@/lib/deals"
import { Suspense } from "react"

// Semua deals sudah di-transform sekali dengan random offset stabil per sesi
const ALL_DEALS: Deal[] = getAllDeals().map(transformDeal)
const LIMIT = 10

function DealsPageInner() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const initialPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1)
  const highlightId = searchParams.get("highlight")
  const errorType = searchParams.get("error")
  const errorId = searchParams.get("id")

  const [visibleCount, setVisibleCount] = useState(initialPage * LIMIT)
  const [highlightedDeal, setHighlightedDeal] = useState<string | null>(highlightId)
  const [error] = useState<string | null>(
    errorType === "notfound"
      ? `Deal với ID "${errorId}" không tìm thấy. Có thể liên kết đã cũ hoặc không đúng.`
      : null
  )

  const hasMore = visibleCount < ALL_DEALS.length
  const visibleDeals = ALL_DEALS.slice(0, visibleCount)

  const observer = useRef<IntersectionObserver | null>(null)
  const lastDealElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setVisibleCount((prev) => prev + LIMIT)
        }
      })
      if (node) observer.current.observe(node)
    },
    [hasMore]
  )

  // Scroll & highlight deal khi có ?highlight=
  useEffect(() => {
    if (!highlightedDeal || visibleDeals.length === 0) return
    const dealElement = document.getElementById(`deal-${highlightedDeal}`)
    if (!dealElement) return

    const timer = setTimeout(() => {
      dealElement.scrollIntoView({ behavior: "smooth", block: "center" })
      setTimeout(() => {
        setHighlightedDeal(null)
        const url = new URL(window.location.href)
        url.searchParams.delete("highlight")
        url.searchParams.delete("page")
        navigate(url.pathname + url.search, { replace: true })
      }, 5000)
    }, 500)

    return () => clearTimeout(timer)
  }, [highlightedDeal, visibleDeals, navigate])

  const [deals, setDeals] = useState<Deal[]>(visibleDeals)

  // Sync khi visibleCount thay đổi (scroll xuống)
  useEffect(() => {
    setDeals(ALL_DEALS.slice(0, visibleCount))
  }, [visibleCount])

  const handleContactClick = async (dealId: string) => {
    try {
      await fetch(`/api/d/${dealId}/contact`, { method: "POST" })
    } catch {
      // stateless — ignore errors
    }
    setDeals((prev) =>
      prev.map((d) =>
        d.deal_id === dealId ? { ...d, contact_count: d.contact_count + 1 } : d
      )
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            🔥 Tổng hợp đơn Seeding 🔥
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Liên hệ Seller để nhận công việc.
          </p>
        </div>

        {error && (
          <div className="text-center py-12 text-red-600">
            <p>Lỗi: {error}</p>
            <Button onClick={() => navigate("/")} className="mt-4">
              Quay lại trang chính
            </Button>
          </div>
        )}

        {!error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deals.map((deal, index) => {
                const isLast = deals.length === index + 1
                return (
                  <div ref={isLast ? lastDealElementRef : null} key={deal.deal_id}>
                    <DealCard
                      deal={deal}
                      onContactClick={handleContactClick}
                      isHighlighted={highlightedDeal === deal.deal_id}
                    />
                  </div>
                )
              })}
            </div>

            {hasMore && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">Đang tải thêm...</p>
              </div>
            )}

            {!hasMore && deals.length > 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">Bạn đã xem hết tất cả các deal.</p>
              </div>
            )}

            {deals.length === 0 && !error && (
              <div className="text-center py-12">
                <p className="text-gray-500">Chưa có deal nào được đăng.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default function DealsPage() {
  return (
    <Suspense fallback={
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" />
        <p className="text-gray-600">Đang tải...</p>
      </div>
    }>
      <DealsPageInner />
    </Suspense>
  )
}
