"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CalendarProps {
  onDateSelect?: (date: Date) => void
  selectedDate?: Date
}

export function Calendar({ onDateSelect, selectedDate }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const today = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const firstDayWeekday = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  // Month names in Japanese and English
  const monthNames = [
    "1月 January",
    "2月 February",
    "3月 March",
    "4月 April",
    "5月 May",
    "6月 June",
    "7月 July",
    "8月 August",
    "9月 September",
    "10月 October",
    "11月 November",
    "12月 December",
  ]

  // Weekday names in Japanese and English
  const weekdays = ["日 Sun", "月 Mon", "火 Tue", "水 Wed", "木 Thu", "金 Fri", "土 Sat"]

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(year, month, day)
    onDateSelect?.(clickedDate)
  }

  const isToday = (day: number) => {
    return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day
  }

  const isSelected = (day: number) => {
    if (!selectedDate) return false
    return selectedDate.getFullYear() === year && selectedDate.getMonth() === month && selectedDate.getDate() === day
  }

  // Generate calendar days
  const calendarDays = []

  // Empty cells for days before month starts
  for (let i = 0; i < firstDayWeekday; i++) {
    calendarDays.push(null)
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        {/* Header with navigation */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateMonth("prev")}
            className="hover:bg-accent hover:text-accent-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <h2 className="text-lg font-semibold text-foreground">
            {year}年 {monthNames[month]}
          </h2>

          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateMonth("next")}
            className="hover:bg-accent hover:text-accent-foreground"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekdays.map((weekday, index) => (
            <div key={index} className="text-center text-sm font-medium text-muted-foreground p-2">
              {weekday}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => (
            <div key={index} className="aspect-square">
              {day && (
                <Button
                  variant={isSelected(day) ? "default" : isToday(day) ? "secondary" : "ghost"}
                  className={`w-full h-full text-sm ${
                    isToday(day) && !isSelected(day)
                      ? "bg-secondary text-secondary-foreground border-2 border-primary"
                      : ""
                  } ${
                    isSelected(day) ? "bg-primary text-primary-foreground" : ""
                  } hover:bg-accent hover:text-accent-foreground transition-colors`}
                  onClick={() => handleDateClick(day)}
                >
                  {day}
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Today indicator */}
        <div className="mt-4 text-center text-sm text-muted-foreground">
          今日: {today.getFullYear()}年{today.getMonth() + 1}月{today.getDate()}日
        </div>
      </CardContent>
    </Card>
  )
}
