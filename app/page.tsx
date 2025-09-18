// This file redirects the root URL (/) to /d
import { redirect } from 'next/navigation'

export default function Page() {
  redirect('/d')
  return null
}
