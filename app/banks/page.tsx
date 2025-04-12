"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Search } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useLanguage } from "@/components/language-provider"

export default function BanksPage() {
  const { t } = useTranslation()
  const { language } = useLanguage()

  // In a real app, this data would be fetched from an API
  const banks = [
    { id: "attijariwafa", name: "Attijariwafa Bank", logo: "/placeholder.svg?height=60&width=60" },
    { id: "bmce", name: "BMCE Bank", logo: "/placeholder.svg?height=60&width=60" },
    { id: "bp", name: "Banque Populaire", logo: "/placeholder.svg?height=60&width=60" },
    { id: "sgma", name: "Société Générale Maroc", logo: "/placeholder.svg?height=60&width=60" },
    { id: "cih", name: "CIH Bank", logo: "/placeholder.svg?height=60&width=60" },
    { id: "cam", name: "Crédit Agricole du Maroc", logo: "/placeholder.svg?height=60&width=60" },
    { id: "cdm", name: "Crédit du Maroc", logo: "/placeholder.svg?height=60&width=60" },
    { id: "bmci", name: "BMCI", logo: "/placeholder.svg?height=60&width=60" },
    { id: "cfg", name: "CFG Bank", logo: "/placeholder.svg?height=60&width=60" },
  ]

  return (
    <div className="container py-8" dir={language === "ar" ? "rtl" : "ltr"}>
      <h1 className="text-3xl font-bold mb-6">{t("banks.title")}</h1>
      <p className="text-muted-foreground mb-8">{t("banks.subtitle")}</p>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder={t("banks.searchPlaceholder")} className="pl-10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {banks.map((bank) => (
          <Link href={`/banks/${bank.id}`} key={bank.id}>
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardHeader className="flex flex-row items-center gap-4">
                <img
                  src={bank.logo || "/placeholder.svg"}
                  alt={bank.name}
                  className="h-12 w-12 rounded-md object-contain bg-white p-1"
                />
                <div>
                  <CardTitle>{bank.name}</CardTitle>
                  <CardDescription>{t("banks.viewRates")}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
