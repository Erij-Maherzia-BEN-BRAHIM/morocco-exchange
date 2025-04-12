"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useTheme } from "next-themes"
import { Building2, ChevronDown, Globe, LogIn, Menu, Moon, Store, Sun, UserPlus, Wallet } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/components/language-provider"
import { useTranslation } from "react-i18next"

const languages = [
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
  { code: "ar", name: "العربية" },
]

export default function Navbar() {
  const { language, setLanguage } = useLanguage()
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const { t } = useTranslation()

  const navigation = [
    { name: t("navbar.currencies"), href: "/currencies", icon: Wallet },
    { name: t("navbar.banks"), href: "/banks", icon: Building2 },
    { name: t("navbar.exchangeOffices"), href: "/exchange-offices", icon: Store },
  ]

  const isActive = (path: string) => pathname === path

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-2 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <nav className="grid gap-6 text-lg font-medium">
              <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                <Globe className="h-5 w-5" />
                <span>Morocco Exchange</span>
              </Link>
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 ${
                    isActive(item.href) ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              ))}
              <Link href="/login" className="flex items-center gap-2 text-muted-foreground">
                <LogIn className="h-5 w-5" />
                {t("navbar.login")}
              </Link>
              <Link href="/signup" className="flex items-center gap-2 text-muted-foreground">
                <UserPlus className="h-5 w-5" />
                {t("navbar.signup")}
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="mr-6 flex items-center gap-2">
          <Globe className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">Morocco Exchange</span>
        </Link>
        <nav className="hidden flex-1 md:flex md:gap-6">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-1 text-sm font-medium ${
                isActive(item.href) ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <Globe className="h-4 w-4" />
                {languages.find((lang) => lang.code === language)?.name}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem key={lang.code} onClick={() => setLanguage(lang.code)}>
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <div className="hidden md:flex md:gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                {t("navbar.login")}
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/signup">
                <UserPlus className="mr-2 h-4 w-4" />
                {t("navbar.signup")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
