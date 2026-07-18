import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SiteFooter() {
  return (
    <footer className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-[#0d1321] dark:to-[#0b0f19] border-t border-blue-100 dark:border-gray-800/80 py-6 transition-colors duration-300">
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
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-base">Tổng hợp đơn seeding</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">liên tục trong nhóm</p>
            </div>
          </div>
          <a href="https://t.me/+UzSS1v4tWLlhMjU1" target="_blank" rel="noopener noreferrer">
            <Button className="bg-[#0088CC] hover:bg-[#0077B3] text-white flex items-center gap-2 whitespace-nowrap px-6 py-3">
              Tham gia ngay
              <ArrowRight className="w-4 h-4" />
            </Button>
          </a>
        </div>
        
        {/* Testing note */}
        <div className="mt-6 pt-4 border-t border-blue-100/50 dark:border-gray-800/50 text-center text-xs text-gray-500 dark:text-gray-400">
          <p>* Website đang trong giai đoạn thử nghiệm.</p>
        </div>
      </div>
    </footer>
  )
}
