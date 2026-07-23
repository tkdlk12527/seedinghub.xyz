import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAllDeals } from "@/lib/deals"

const ALL_DEALS = getAllDeals()
const LIMIT = 10

export default function ShortIdRedirect() {
  const { shortId } = useParams<{ shortId: string }>()
  const navigate = useNavigate()

  useEffect(() => {
    if (!shortId) {
      navigate("/", { replace: true })
      return
    }

    const index = ALL_DEALS.findIndex((d) => d.id.toString() === shortId)

    if (index === -1) {
      navigate(`/?error=notfound&id=${shortId}`, { replace: true })
    } else {
      const page = Math.ceil((index + 1) / LIMIT)
      navigate(`/?page=${page}&highlight=${shortId}`, { replace: true })
    }
  }, [shortId, navigate])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" />
        <p className="text-gray-600">Đang tìm deal...</p>
      </div>
    </div>
  )
}
