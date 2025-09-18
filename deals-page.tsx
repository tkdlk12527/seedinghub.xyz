"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageCircle, ExternalLink } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

interface Deal {
  deal_id: string
  content: string
  contact_count: number // This will now include the random offset
  facebook_link: string
  created_at: string
}

const DealCard = ({
  deal,
  onContactClick,
  isHighlighted = false,
}: {
  deal: Deal
  onContactClick: (dealId: string) => void
  isHighlighted?: boolean
}) => {
  const handleContactClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (deal.facebook_link) {
      try {
        // Track the contact click first (don't await to avoid delay)
        onContactClick(deal.deal_id)

        // Open the link immediately - use the same method as header buttons
        window.open(deal.facebook_link, "_blank", "noopener,noreferrer")
      } catch (error) {
        console.error("Failed to open link:", error)
        // Fallback - try direct navigation
        window.location.href = deal.facebook_link
      }
    }
  }

  return (
    <div
      id={`deal-${deal.deal_id}`}
      className={`bg-white border rounded-lg p-4 hover:shadow-md transition-all duration-300 ${
        isHighlighted ? "border-blue-500 shadow-lg ring-2 ring-blue-200 bg-blue-50" : "border-gray-200"
      }`}
    >
      {/* Deal ID - First Row */}
      <div className="mb-3">
        <Badge variant="outline" className="text-xs font-medium">
          Deal #{deal.deal_id}
        </Badge>
        {isHighlighted && (
          <Badge variant="default" className="text-xs font-medium ml-2 bg-blue-600">
            Được chia sẻ
          </Badge>
        )}
      </div>

      {/* Content - Middle Section */}
      <div className="mb-4">
        <p className="text-gray-800 text-sm leading-relaxed line-clamp-4">{deal.content}</p>
      </div>

      {/* Bottom Row - Contact Count + Action Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center text-gray-500 text-xs">
          <MessageCircle className="w-3 h-3 mr-1" />
          <span>{Math.max(0, Number.parseInt(deal.contact_count?.toString() || "0", 10))} lượt liên hệ</span>
        </div>
        <Button
          size="sm"
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleContactClick}
          disabled={!deal.facebook_link}
          type="button"
        >
          <ExternalLink className="w-3 h-3 mr-1" />
          Liên hệ Seller
        </Button>
      </div>
    </div>
  )
}

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [highlightedDeal, setHighlightedDeal] = useState<string | null>(null)

  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await fetch("/api/deals")
        if (!response.ok) {
          throw new Error("Failed to fetch deals")
        }
        const data = await response.json()
        setDeals(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchDeals()
  }, [])

  const handleContactClick = async (dealId: string) => {
    try {
      // Update contact count in database
      const response = await fetch(`/api/deals/${dealId}/contact`, {
        method: "POST",
      })

      if (response.ok) {
        const result = await response.json()
        // Update local state with the exact new count from the server
        setDeals((prevDeals) =>
          prevDeals.map((deal) =>
            deal.deal_id === dealId
              ? { ...deal, contact_count: result.newCount + 20 + Math.floor(Math.random() * 31) } // Add the random offset for display
              : deal,
          ),
        )
      }
    } catch (error) {
      console.error("Failed to track contact:", error)
      // Don't show error to user, just log it
    }
  }

  // Handle highlighting and scrolling to specific deal
  useEffect(() => {
    const highlight = searchParams.get("highlight")
    if (highlight && deals.length > 0) {
      setHighlightedDeal(highlight)

      // Scroll to the deal after a short delay to ensure rendering is complete
      setTimeout(() => {
        const dealElement = document.getElementById(`deal-${highlight}`)
        if (dealElement) {
          dealElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          })

          // Remove highlight after 5 seconds
          setTimeout(() => {
            setHighlightedDeal(null)
            // Clean up URL
            router.replace("/", { scroll: false })
          }, 5000)
        } else {
          // Deal not found, show error message
          setError(
            `Deal với ID "${highlight}" không tìm thấy. Có thể liên kết đã cũ hoặc không đúng.`,
          )
          setTimeout(() => {
            router.replace("/", { scroll: false })
          }, 5000)
        }
      }, 500)
    }
  }, [deals, searchParams, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải deals...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Lỗi: {error}</p>
          <Button onClick={() => window.location.reload()}>Thử lại</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            🔥 Tổng hợp đơn Seeding 🔥
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Liên hệ Seller để nhận công việc.
          </p>
        </div>

        {/* Deal Cards Grid */}
        {deals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deals.map((deal) => (
              <DealCard
                key={deal.deal_id}
                deal={deal}
                onContactClick={handleContactClick}
                isHighlighted={highlightedDeal === deal.deal_id}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Chưa có deal nào được đăng.</p>
          </div>
        )}
      </div>
    </div>
  )
}
