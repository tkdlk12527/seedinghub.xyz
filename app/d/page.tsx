"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { DealCard, Deal } from "./deal-card"
import { Button } from "@/components/ui/button"

export default function DealsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [deals, setDeals] = useState<Deal[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [highlightedDeal, setHighlightedDeal] = useState<string | null>(null)

  const observer = useRef<IntersectionObserver>()
  const lastDealElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore]
  )

  useEffect(() => {
    const initialPage = parseInt(searchParams.get('page') || '1', 10);
    setPage(initialPage);

    const highlightId = searchParams.get('highlight');
    if (highlightId) {
      setHighlightedDeal(highlightId);
    }

    const errorType = searchParams.get('error');
    if (errorType === 'notfound') {
      const id = searchParams.get('id');
      setError(`Deal với ID "${id}" không tìm thấy. Có thể liên kết đã cũ hoặc không đúng.`);
    }

  }, [searchParams]);

  useEffect(() => {
    const fetchDeals = async (pageNum: number) => {
      if (!hasMore && pageNum > 1) return;
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/d?page=${pageNum}`)
        if (!response.ok) {
          throw new Error("Failed to fetch deals")
        }
        const newDeals = await response.json()
        
        setDeals((prevDeals) => {
          const existingDealIds = new Set(prevDeals.map(d => d.deal_id));
          const filteredNewDeals = newDeals.filter((d: Deal) => !existingDealIds.has(d.deal_id));
          return [...prevDeals, ...filteredNewDeals];
        });

        if (newDeals.length === 0) {
          setHasMore(false);
        }

      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchDeals(page);

  }, [page]);

  useEffect(() => {
    if (highlightedDeal && deals.length > 0) {
      const dealElement = document.getElementById(`deal-${highlightedDeal}`)
      if (dealElement) {
        setTimeout(() => {
            dealElement.scrollIntoView({
                behavior: "smooth",
                block: "center",
            })
            // Remove highlight after 5 seconds
            setTimeout(() => {
                setHighlightedDeal(null)
                const url = new URL(window.location.href);
                url.searchParams.delete('highlight');
                url.searchParams.delete('page');
                router.replace(url.toString(), { scroll: false })
            }, 5000)
        }, 500); // Delay to ensure rendering is complete
      }
    }
  }, [highlightedDeal, deals, router]);

  const handleContactClick = async (dealId: string) => {
    try {
      const response = await fetch(`/api/d/${dealId}/contact`, {
        method: "POST",
      })
      if (!response.ok) return;
      const result = await response.json()
      setDeals((prevDeals) =>
        prevDeals.map((deal) =>
          deal.deal_id === dealId
            ? { ...deal, contact_count: result.newCount + 20 + Math.floor(Math.random() * 31) }
            : deal,
        ),
      )
    } catch (error) {
      console.error("Failed to track contact:", error)
    }
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
            <Button onClick={() => router.push('/d')} className="mt-4">Quay lại trang chính</Button>
          </div>
        )}

        {!error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deals.map((deal, index) => {
                const isLastElement = deals.length === index + 1;
                return (
                  <div ref={isLastElement ? lastDealElementRef : null} key={deal.deal_id}>
                    <DealCard
                      deal={deal}
                      onContactClick={handleContactClick}
                      isHighlighted={highlightedDeal === deal.deal_id}
                    />
                  </div>
                )
              })}
            </div>

            {loading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Đang tải thêm...</p>
              </div>
            )}

            {!loading && !hasMore && deals.length > 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">Bạn đã xem hết tất cả các deal.</p>
                </div>
            )}

            {!loading && deals.length === 0 && !error && (
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
