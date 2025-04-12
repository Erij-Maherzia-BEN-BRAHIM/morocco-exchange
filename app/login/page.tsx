"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { useLanguage } from "@/components/language-provider"

export default function LoginPage() {
  const { t } = useTranslation()
  const { language } = useLanguage()

  return (
    <div className="container flex items-center justify-center py-12" dir={language === "ar" ? "rtl" : "ltr"}>
      <Card className="mx-auto max-w-md w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">{t("login.title")}</CardTitle>
          <CardDescription>{t("login.subtitle")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t("login.email")}</Label>
            <Input id="email" type="email" placeholder="m.example@exchange.ma" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">{t("login.password")}</Label>
              <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                {t("login.forgotPassword")}
              </Link>
            </div>
            <Input id="password" type="password" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full">{t("login.loginButton")}</Button>
          <div className="text-center text-sm">
            {t("login.noAccount")}{" "}
            <Link href="/signup" className="text-primary hover:underline">
              {t("login.signupLink")}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
