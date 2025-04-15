"use client";

import CurrencyFlag from "@/components/currency-flag";
import { useExchangeRates } from "@/hooks/use-exchange-rates";
import { ArrowDown, ArrowUp } from "lucide-react";

export default function RatesMarquee() {
  const { rates, date } = useExchangeRates();

  if (rates.length > 0)
    return (
      <div className="bg-muted py-2 overflow-hidden border-b">
        <div className="animate-marquee whitespace-nowrap flex">
          {date && <strong className="mr-4">{date}</strong>}
          {rates.concat(rates).map((currency, index) => (
            <div key={index} className="inline-flex items-center mx-4">
              <CurrencyFlag code={currency.code} className="h-4 w-6 mr-2" />
              <span className="font-semibold">{currency.code}</span>
              <span className="mx-1">{currency.rate}</span>
              <span
                className={`inline-flex items-center ${
                  currency.change > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {currency.change > 0 ? (
                  <ArrowUp className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDown className="h-3 w-3 mr-1" />
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
}
