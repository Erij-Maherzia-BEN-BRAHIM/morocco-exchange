"use client"

import { useEffect, useState } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

type ChartData = {
  date: string
  value: number
}

export default function CurrencyChart({ currencyCode }: { currencyCode: string }) {
  const [data, setData] = useState<ChartData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, you would fetch historical data from an API
    const generateMockData = () => {
      const mockData: ChartData[] = []
      const today = new Date()
      const baseValue = currencyCode === "USD" ? 10 : currencyCode === "EUR" ? 11 : currencyCode === "GBP" ? 12.8 : 7

      for (let i = 180; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(today.getDate() - i)

        // Generate a somewhat realistic fluctuation
        const randomFactor = 0.05 // 5% max fluctuation
        const fluctuation = baseValue * randomFactor * (Math.random() - 0.5)
        const dayOfWeek = date.getDay()

        // No changes on weekends
        const value =
          dayOfWeek === 0 || dayOfWeek === 6
            ? mockData[mockData.length - 1]?.value || baseValue
            : baseValue + fluctuation

        mockData.push({
          date: date.toISOString().split("T")[0],
          value: Number.parseFloat(value.toFixed(4)),
        })
      }

      return mockData
    }

    // Simulate API fetch
    setTimeout(() => {
      setData(generateMockData())
      setIsLoading(false)
    }, 1000)
  }, [currencyCode])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tickFormatter={(date) => {
              const d = new Date(date)
              return `${d.getDate()}/${d.getMonth() + 1}`
            }}
            tick={{ fontSize: 12 }}
            tickCount={6}
          />
          <YAxis domain={["auto", "auto"]} tick={{ fontSize: 12 }} />
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="flex flex-col gap-2">
                      <p className="text-sm text-muted-foreground">{data.date}</p>
                      <p className="font-bold">{data.value.toFixed(2)} MAD</p>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorValue)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
