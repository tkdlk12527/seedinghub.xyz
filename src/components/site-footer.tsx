import { Button } from "@/components/ui/button"

export function SiteFooter() {
  return (
    <footer className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-[#0d1321] dark:to-[#0b0f19] border-t border-blue-100 dark:border-gray-800/80 py-8 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-md z-30 flex-shrink-0">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/330px-Telegram_2019_Logo.svg.png"
                  alt="Telegram"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-md z-20 flex-shrink-0">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/330px-Icon_of_Zalo.svg.png"
                  alt="Zalo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white bg-white overflow-hidden shadow-md z-10 flex-shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-7 h-7 fill-[#1877F2]">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-base">Tổng hợp đơn seeding liên tục</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tham gia cộng đồng để không bỏ lỡ các công việc mới nhất</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href="https://t.me/+Hqiyu9DN-tg1OWU1" target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#0088CC] hover:bg-[#0077B3] text-white flex items-center gap-2 px-4 py-2 text-sm rounded-lg shadow-sm font-medium">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/330px-Telegram_2019_Logo.svg.png"
                  alt="Telegram"
                  className="w-4 h-4"
                />
                Nhóm Telegram
              </Button>
            </a>
            <a href="https://zalo.me/g/vdbfse702" target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#0068FF] hover:bg-[#0052CC] text-white flex items-center gap-2 px-4 py-2 text-sm rounded-lg shadow-sm font-medium">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/330px-Icon_of_Zalo.svg.png"
                  alt="Zalo"
                  className="w-4 h-4"
                />
                Nhóm Zalo
              </Button>
            </a>
            <a href="https://www.facebook.com/groups/2542746036079186/" target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#1877F2] hover:bg-[#166FE5] text-white flex items-center gap-2 px-4 py-2 text-sm rounded-lg shadow-sm font-medium">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Nhóm Facebook
              </Button>
            </a>
          </div>
        </div>
        
        {/* Testing note */}
        <div className="mt-6 pt-4 border-t border-blue-100/50 dark:border-gray-800/50 text-center text-xs text-gray-500 dark:text-gray-400">
          <p>* Website đang trong giai đoạn thử nghiệm.</p>
        </div>
      </div>
    </footer>
  )
}
