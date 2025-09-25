"use client"

import { useState, useEffect } from "react"
import { MessageCircle, Facebook, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function ComingSoonPage() {
  const [currentTime, setCurrentTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const gmtPlus7 = new Date(now.getTime() + 7 * 60 * 60 * 1000)

      const hours = gmtPlus7.getUTCHours()
      const minutes = gmtPlus7.getUTCMinutes()
      const seconds = gmtPlus7.getUTCSeconds()

      setCurrentTime({ hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20 p-4">
      <div className="w-full max-w-3xl text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Seedinghub<span class="text-primary" contenteditable="false"></span>{""}
          <span className="text-primary">.vn</span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-xl mx-auto">
          Tổng hợp tất cả các đơn seeding trên các group facebook.
        </p>

        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
          {Object.entries(currentTime).map(([unit, value]) => (
            <Card key={unit} className="p-4 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold">{String(value).padStart(2, "0")}</span>
              <span className="text-xs text-muted-foreground capitalize">
                {unit === "hours" ? "giờ" : unit === "minutes" ? "phút" : "giây"}
              </span>
            </Card>
          ))}
        </div>

        

        <div className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="flex items-center gap-2">
              <a href="https://t.me/+UzSS1v4tWLlhMjU1" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                Nhóm seeding Telegram
              </a>
            </Button>
            <Button asChild variant="outline" className="flex items-center gap-2 bg-transparent">
              <a href="https://www.facebook.com/seedinghub.vn" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-4 w-4" />
                Theo dõi Page
              </a>
            </Button>
            <Button asChild variant="secondary" className="flex items-center gap-2">
              <a href="https://zalo.me/0902484767" target="_blank" rel="noopener noreferrer">
                <Phone className="h-4 w-4" />
                Zalo
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}