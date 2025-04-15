import type { ReactNode } from "react";

type CurrencyFlagProps = {
  code: string;
  className?: string;
};

// Map currency codes to country codes for flags
const currencyToCountry: Record<string, string> = {
  AED: "ae",
  AUD: "au",
  CAD: "ca",
  CHF: "ch",
  EUR: "eu",
  GBP: "gb",
  JPY: "jp",
  SAR: "sa",
  USD: "us",
  KWD: "kw",
  BHD: "bh",
  OMR: "om",
  QAR: "qr",
  GIP: "gi",
};

export default function CurrencyFlag({
  code,
  className = "h-5 w-7",
}: CurrencyFlagProps): ReactNode {
  const countryCode = currencyToCountry[code]?.toLowerCase() || "unknown";

  return (
    <img
      src={`/flags/${countryCode}.svg`}
      alt={`${code} flag`}
      className={`rounded-sm object-cover ${className}`}
    />
  );
}
