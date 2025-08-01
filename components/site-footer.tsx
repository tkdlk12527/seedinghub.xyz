import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SiteFooter() {
  return (
    <footer className="bg-gradient-to-r from-cyan-50 to-blue-50 border-t border-blue-100 py-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/330px-Telegram_2019_Logo.svg.png"
                alt="Telegram"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-base">Tụi mình tổng hợp đơn seeding</h3>
              <p className="text-sm text-gray-600">liên tục trong nhóm</p>
            </div>
          </div>
          <Link href="https://t.me/+UzSS1v4tWLlhMjU1" target="_blank" rel="noopener noreferrer">
            <Button className="bg-[#0088CC] hover:bg-[#0077B3] text-white flex items-center gap-2 whitespace-nowrap px-6 py-3">
              Tham gia ngay
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  )
}
