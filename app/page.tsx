import DealsPage from "../deals-page"
import { Suspense } from "react"

export default function Page() {
  return (
    <Suspense fallback={<div>Đang tải...</div>}>
      <DealsPage />
    </Suspense>
  )
}
