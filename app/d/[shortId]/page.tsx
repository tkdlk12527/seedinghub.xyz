"use client"
import DealsPage from "./../deals-page"
import { useEffect } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"

export default function Page() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()

  // When visiting /d/[shortId], update the query param to highlight the deal
  useEffect(() => {
    if (params?.shortId && searchParams.get("highlight") !== params.shortId) {
      // Replace the URL with the highlight param, but stay on /d/[shortId]
      const url = `/d/${params.shortId}?highlight=${params.shortId}`
      router.replace(url, { scroll: false })
    }
  }, [params, router, searchParams])

  return <DealsPage />
}
