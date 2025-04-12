"use client"

import { useEffect, useState } from "react"
import { ArrowDown, ArrowUp } from "lucide-react"
import CurrencyFlag from "@/components/currency-flag"

type CurrencyRate = {
  code: string
  name: string
  rate: number
  change: number
}

export default function RatesMarquee() {
  const [rates, setRates] = useState<CurrencyRate[]>([
    { code: "USD", name: "US Dollar", rate: 10.05, change: 0.02 },
    { code: "EUR", name: "Euro", rate: 11.15, change: -0.03 },
    { code: "GBP", name: "British Pound", rate: 12.85, change: 0.05 },
    { code: "JPY", name: "Japanese Yen", rate: 0.068, change: -0.001 },
    { code: "CAD", name: "Canadian Dollar", rate: 7.45, change: 0.01 },
    { code: "CHF", name: "Swiss Franc", rate: 11.25, change: 0.04 },
    { code: "AUD", name: "Australian Dollar", rate: 6.75, change: -0.02 },
  ])

  // In a real app, you would fetch the rates from the Moroccan central bank API
  useEffect(() => {
    // Simulating API fetch
    const fetchRates = async () => {
      try {
        // const response = await fetch('https://api.centralbank.ma/rates')
        // const data = await response.json()
        // setRates(data)
        // For now, we'll use the mock data
      } catch (error) {
        console.error("Failed to fetch rates:", error)
      }
    }

    fetchRates()
    // Set up a refresh interval (e.g., every 5 minutes)
    const interval = setInterval(fetchRates, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-muted py-2 overflow-hidden border-b">
      <div className="animate-marquee whitespace-nowrap flex">
        {rates.concat(rates).map((currency, index) => (
          <div key={index} className="inline-flex items-center mx-4">
            <CurrencyFlag code={currency.code} className="h-4 w-6 mr-2" />
            <span className="font-semibold">{currency.code}</span>
            <span className="mx-1">{currency.rate.toFixed(2)} MAD</span>
            <span className={`inline-flex items-center ${currency.change > 0 ? "text-green-500" : "text-red-500"}`}>
              {currency.change > 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
              {Math.abs(currency.change).toFixed(3)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
