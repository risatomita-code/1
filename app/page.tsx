"use client"

import { useState } from "react"
import { Calendar } from "@/components/calendar"

export default function HomePage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  return (
    <main className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">カレンダー Calendar</h1>
          <p className="text-muted-foreground">日付を選択してください / Select a date</p>
        </header>

        <div className="flex flex-col items-center gap-6">
          <Calendar onDateSelect={handleDateSelect} selectedDate={selectedDate} />

          {selectedDate && (
            <div className="text-center p-4 bg-card rounded-lg border">
              <h3 className="font-semibold text-card-foreground mb-2">選択された日付 / Selected Date</h3>
              <p className="text-lg text-primary">
                {selectedDate.getFullYear()}年{selectedDate.getMonth() + 1}月{selectedDate.getDate()}日
              </p>
              <p className="text-sm text-muted-foreground">
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
