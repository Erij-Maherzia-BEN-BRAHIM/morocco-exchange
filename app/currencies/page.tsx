"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import CurrencyChart from "@/components/currency-chart";
import CurrencyFlag from "@/components/currency-flag";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/components/language-provider";
import { useExchangeRates } from "@/hooks/use-exchange-rates";
import { Skeleton } from "@/components/ui/skeleton";

export default function CurrenciesPage() {
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { rates: currencies } = useExchangeRates();

  const handleCurrencyClick = (code: string) => {
    setSelectedCurrency(code === selectedCurrency ? null : code);
  };

  const selectedCurrencyData = currencies.find(
    (c) => c.code === selectedCurrency
  );

  return (
    <div className="container py-8" dir={language === "ar" ? "rtl" : "ltr"}>
      <h1 className="text-3xl font-bold mb-6">{t("currencies.title")}</h1>
      <p className="text-muted-foreground mb-8">{t("currencies.subtitle")}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {currencies.length > 0
          ? currencies.map((currency) => (
              <Card
                key={currency.code}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedCurrency === currency.code
                    ? "ring-2 ring-primary"
                    : ""
                }`}
                onClick={() => handleCurrencyClick(currency.code)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <CurrencyFlag code={currency.code} />
                      <span>{currency.code}</span>
                    </div>
                    <span
                      className={
                        currency.change > 0 ? "text-green-500" : "text-red-500"
                      }
                    >
                      {currency.change > 0 ? "+" : ""}
                      {currency.change.toFixed(3)}
                    </span>
                  </CardTitle>
                  <CardDescription>{currency.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{currency.rate} MAD</div>
                </CardContent>
              </Card>
            ))
          : Array(13)
              .fill(0)
              .map((_, index) => (
                <div key={index}>
                  <Skeleton />
                </div>
              ))}
      </div>

      {selectedCurrency && (
        <Card className="mb-8 relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 z-10"
            onClick={() => setSelectedCurrency(null)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CurrencyFlag code={selectedCurrency} />
              {selectedCurrency} / MAD - {t("currencies.historicalChart")}
            </CardTitle>
            <CardDescription>
              {selectedCurrencyData?.name} to Moroccan Dirham -{" "}
              {t("currencies.lastSixMonths")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CurrencyChart currencyCode={selectedCurrency} />
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{t("currencies.aboutRates.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{t("currencies.aboutRates.paragraph1")}</p>
          <p>{t("currencies.aboutRates.paragraph2")}</p>
          <p className="mt-4 text-sm text-muted-foreground">
            {t("currencies.aboutRates.clickInfo")}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
