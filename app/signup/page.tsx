"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { useLanguage } from "@/components/language-provider"

export default function SignupPage() {
  const { t } = useTranslation()
  const { language } = useLanguage()

  return (
    <div className="container flex items-center justify-center py-12" dir={language === "ar" ? "rtl" : "ltr"}>
      <Card className="mx-auto max-w-md w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">{t("signup.title")}</CardTitle>
          <CardDescription>{t("signup.subtitle")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="business-name">{t("signup.officeName")}</Label>
            <Input id="business-name" placeholder="Your Exchange Office Name" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">{t("signup.firstName")}</Label>
              <Input id="first-name" placeholder="Mohamed" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">{t("signup.lastName")}</Label>
              <Input id="last-name" placeholder="El Alami" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t("signup.email")}</Label>
            <Input id="email" type="email" placeholder="m.example@exchange.ma" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">{t("signup.phone")}</Label>
            <Input id="phone" type="tel" placeholder="+212 522 123 456" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">{t("signup.city")}</Label>
            <Select>
              <SelectTrigger id="location">
                <SelectValue placeholder={t("signup.selectCity")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="casablanca">Casablanca</SelectItem>
                <SelectItem value="rabat">Rabat</SelectItem>
                <SelectItem value="marrakech">Marrakech</SelectItem>
                <SelectItem value="fes">Fes</SelectItem>
                <SelectItem value="tangier">Tangier</SelectItem>
                <SelectItem value="agadir">Agadir</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t("signup.password")}</Label>
            <Input id="password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">{t("signup.confirmPassword")}</Label>
            <Input id="confirm-password" type="password" />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t("signup.terms")}{" "}
              <Link href="/terms" className="text-primary hover:underline">
                {t("signup.termsLink")}
              </Link>{" "}
              {t("signup.and")}{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                {t("signup.privacyLink")}
              </Link>
            </label>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full">{t("signup.createButton")}</Button>
          <div className="text-center text-sm">
            {t("signup.haveAccount")}{" "}
            <Link href="/login" className="text-primary hover:underline">
              {t("signup.loginLink")}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
