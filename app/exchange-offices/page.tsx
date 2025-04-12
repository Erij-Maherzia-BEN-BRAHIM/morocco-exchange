"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MapPin, Search, Star } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { useLanguage } from "@/components/language-provider"

export default function ExchangeOfficesPage() {
  const { t } = useTranslation()
  const { language } = useLanguage()

  // In a real app, this data would be fetched from an API
  const exchangeOffices = [
    {
      id: "exchange1",
      name: "Global Exchange Morocco",
      location: "Casablanca",
      address: "123 Hassan II Boulevard, Casablanca",
      rating: 4.5,
      reviews: 120,
    },
    {
      id: "exchange2",
      name: "Marrakech Currency Exchange",
      location: "Marrakech",
      address: "45 Jemaa el-Fnaa Square, Marrakech",
      rating: 4.7,
      reviews: 98,
    },
    {
      id: "exchange3",
      name: "Tangier Money Exchange",
      location: "Tangier",
      address: "78 Mohammed V Street, Tangier",
      rating: 4.2,
      reviews: 65,
    },
    {
      id: "exchange4",
      name: "Fes Currency Services",
      location: "Fes",
      address: "12 Talaa Kebira, Fes",
      rating: 4.4,
      reviews: 87,
    },
    {
      id: "exchange5",
      name: "Rabat Exchange Center",
      location: "Rabat",
      address: "56 Mohammed V Avenue, Rabat",
      rating: 4.3,
      reviews: 72,
    },
    {
      id: "exchange6",
      name: "Agadir Money Exchange",
      location: "Agadir",
      address: "34 Hassan II Boulevard, Agadir",
      rating: 4.6,
      reviews: 91,
    },
  ]

  return (
    <div className="container py-8" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">{t("exchangeOfficesPage.title")}</h1>
          <p className="text-muted-foreground">{t("exchangeOfficesPage.subtitle")}</p>
        </div>
        <Button asChild>
          <Link href="/login">{t("exchangeOfficesPage.registerButton")}</Link>
        </Button>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder={t("exchangeOfficesPage.searchPlaceholder")} className="pl-10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {exchangeOffices.map((office) => (
          <Link href={`/exchange-offices/${office.id}`} key={office.id}>
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
              <CardHeader>
                <CardTitle>{office.name}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {office.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{office.address}</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="ml-1 font-medium">{office.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({office.reviews} reviews)</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
