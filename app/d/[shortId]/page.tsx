import { redirect } from "next/navigation"

interface PageProps {
  params: {
    shortId: string
  }
}

export default function Page({ params }: PageProps) {
  // Redirect to main page with the shortId as a query parameter
  redirect(`/?highlight=${params.shortId}`)
}
