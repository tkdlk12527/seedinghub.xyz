import { Button } from "@/components/ui/button"

export function SiteFooter() {
  return (
    <footer className="bg-gradient-to-r from-slate-50 to-blue-50 border-t border-blue-100 py-8">
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
              <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-md z-10 flex-shrink-0">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/100px-Facebook_f_logo_%282019%29.svg.png"
                  alt="Facebook"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-base">Tổng hợp đơn seeding liên tục</h3>
              <p className="text-sm text-gray-600">Tham gia cộng đồng để không bỏ lỡ các công việc mới nhất</p>
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
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/100px-Facebook_f_logo_%282019%29.svg.png"
                  alt="Facebook"
                  className="w-4 h-4"
                />
                Nhóm Facebook
              </Button>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
