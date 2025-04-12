"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import i18n from "@/lib/i18n"

type LanguageContextType = {
  language: string
  setLanguage: (lang: string) => void
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
})

export const useLanguage = () => useContext(LanguageContext)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState(i18n.language || "en")
  const router = useRouter()

  const setLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
    setLanguageState(lang)
    document.documentElement.lang = lang
    document.documentElement.dir = i18n.t("direction")

    // Force a refresh to apply RTL/LTR changes
    if (lang === "ar" && document.documentElement.dir !== "rtl") {
      router.refresh()
    } else if (lang !== "ar" && document.documentElement.dir !== "ltr") {
      router.refresh()
    }
  }

  useEffect(() => {
    // Initialize language on client-side
    setLanguage(language)
  }, [language])

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>
}
