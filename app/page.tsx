"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Building2, Store, Wallet } from "lucide-react"
import { useTranslation } from "react-i18next"

export default function Home() {
  const { t } = useTranslation()

  return (
    <div className="container py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">{t("home.title")}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("home.subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Wallet className="h-5 w-5" />
            <div>
              <CardTitle>{t("home.currencyRates.title")}</CardTitle>
              <CardDescription>{t("home.currencyRates.description")}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{t("home.currencyRates.content")}</p>
            <Button asChild>
              <Link href="/currencies">{t("home.currencyRates.button")}</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Building2 className="h-5 w-5" />
            <div>
              <CardTitle>{t("home.bankRates.title")}</CardTitle>
              <CardDescription>{t("home.bankRates.description")}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{t("home.bankRates.content")}</p>
            <Button asChild>
              <Link href="/banks">{t("home.bankRates.button")}</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Store className="h-5 w-5" />
            <div>
              <CardTitle>{t("home.exchangeOffices.title")}</CardTitle>
              <CardDescription>{t("home.exchangeOffices.description")}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{t("home.exchangeOffices.content")}</p>
            <Button asChild>
              <Link href="/exchange-offices">{t("home.exchangeOffices.button")}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted rounded-lg p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">{t("home.registerSection.title")}</h2>
        <p className="mb-6 max-w-2xl mx-auto">{t("home.registerSection.content")}</p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" asChild>
            <Link href="/login">{t("home.registerSection.login")}</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">{t("home.registerSection.signup")}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
