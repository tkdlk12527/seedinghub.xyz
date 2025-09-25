"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"

export default function ShortIdRedirectPage() {
  const params = useParams()
  const router = useRouter()
  const shortId = params?.shortId as string

  useEffect(() => {
    if (shortId) {
      const getPageAndRedirect = async () => {
        try {
          const response = await fetch(`/api/d/position/${shortId}`)
          if (!response.ok) {
            // If deal is not found, redirect to the first page of deals
            router.replace(`/d?error=notfound&id=${shortId}`)
            return
          }
          const { page } = await response.json()
          router.replace(`/d?page=${page}&highlight=${shortId}`)
        } catch (error) {
          // In case of any other error, redirect to the base deals page
          router.replace('/d')
        }
      }
      getPageAndRedirect()
    }
  }, [shortId, router])

  // Render a loading state while the redirect is happening
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Đang tìm deal...</p>
      </div>
    </div>
  )
}
