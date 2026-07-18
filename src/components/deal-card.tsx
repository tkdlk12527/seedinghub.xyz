import React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageCircle, ExternalLink, Facebook } from "lucide-react"

export interface Deal {
  deal_id: string
  content: string
  contact_count: number
  facebook_link: string
  created_at: string
  profilePic?: string
  messenger_id?: string
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

    const contactLink = deal.messenger_id || deal.facebook_link
    if (contactLink) {
      try {
        onContactClick(deal.deal_id)
        window.open(contactLink, "_blank", "noopener,noreferrer")
      } catch (error) {
        console.error("Failed to open link:", error)
        window.location.href = contactLink
      }
    }
  }

  return (
    <div
      id={`deal-${deal.deal_id}`}
      className={`bg-white dark:bg-[#111827] border rounded-lg p-4 hover:shadow-md transition-all duration-300 flex flex-col justify-between ${
        isHighlighted
          ? "border-blue-500 dark:border-blue-600 shadow-lg ring-2 ring-blue-200 dark:ring-blue-900/30 bg-blue-50 dark:bg-blue-950/20"
          : "border-gray-200 dark:border-gray-800"
      }`}
    >
      <div>
        <div className="flex items-start gap-3 mb-3">
          {deal.profilePic ? (
            <img
              src={deal.profilePic}
              alt="Seller"
              className="w-10 h-10 rounded-full object-cover border border-gray-100 dark:border-gray-800 shadow-sm"
              onError={(e) => {
                // Fallback if image fails to load
                (e.target as HTMLImageElement).style.display = "none"
              }}
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold text-sm">
              S
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center flex-wrap gap-1.5">
              <Badge className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md text-[10px] font-medium px-2 py-0.5">
                Deal #{deal.deal_id}
              </Badge>
              {isHighlighted && (
                <Badge variant="default" className="text-[10px] font-medium bg-blue-600 px-2 py-0.5">
                  Được chia sẻ
                </Badge>
              )}
            </div>
            <p className="text-gray-400 dark:text-gray-500 text-[10px] mt-0.5">
              {new Date(deal.created_at).toLocaleDateString("vi-VN", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              })}
            </p>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed whitespace-pre-line">{deal.content}</p>
        </div>
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-gray-50 dark:border-gray-800/60">
        <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
          <MessageCircle className="w-3.5 h-3.5 mr-1 text-gray-400 dark:text-gray-500" />
          <span>{Math.max(0, Number.parseInt(deal.contact_count?.toString() || "0", 10))} lượt liên hệ</span>
        </div>
        <div className="flex items-center gap-2">
          {deal.facebook_link && (
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 h-auto rounded-md flex items-center"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                window.open(deal.facebook_link, "_blank", "noopener,noreferrer")
              }}
              type="button"
            >
              <Facebook className="w-3 h-3 mr-1" />
              Bài đăng
            </Button>
          )}
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 h-auto rounded-md flex items-center"
            onClick={handleContactClick}
            disabled={!deal.messenger_id && !deal.facebook_link}
            type="button"
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            {deal.messenger_id ? "Ib Messenger" : "Liên hệ Seller"}
          </Button>
        </div>
      </div>
    </div>
  )
}
