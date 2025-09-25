"use client"

import type React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageCircle, ExternalLink } from "lucide-react"

export interface Deal {
  deal_id: string
  content: string
  contact_count: number
  facebook_link: string
  created_at: string
}

export const DealCard = ({
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
        onContactClick(deal.deal_id)
        window.open(deal.facebook_link, "_blank", "noopener,noreferrer")
      } catch (error) {
        console.error("Failed to open link:", error)
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
      <div className="mb-3">
        <Badge className="bg-gray-200 text-gray-800 rounded-md text-xs font-medium">
          Deal #{deal.deal_id}
        </Badge>
        {isHighlighted && (
          <Badge variant="default" className="text-xs font-medium ml-2 bg-blue-600">
            Được chia sẻ
          </Badge>
        )}
      </div>
      <div className="mb-4">
        <p className="text-gray-800 text-sm leading-relaxed line-clamp-4">{deal.content}</p>
      </div>
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
