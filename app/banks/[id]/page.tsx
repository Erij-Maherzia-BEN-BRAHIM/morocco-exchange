import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowDown, ArrowUp, ChevronLeft } from "lucide-react";
import Link from "next/link";
import CurrencyFlag from "@/components/currency-flag";

export default function BankPage({ params }: { params: { id: string } }) {
  // In a real app, this data would be fetched from an API based on the bank ID
  const bankData = {
    id: params.id,
    name: getBankName(params.id),
    logo: "/placeholder.svg?height=80&width=80",
    lastUpdated: "Today at 08:30 AM",
    rates: [
      {
        currency: "US Dollar",
        code: "USD",
        buy: 9.95,
        sell: 10.15,
        change: 0.02,
      },
      { currency: "Euro", code: "EUR", buy: 11.05, sell: 11.25, change: -0.03 },
      {
        currency: "British Pound",
        code: "GBP",
        buy: 12.75,
        sell: 12.95,
        change: 0.05,
      },
      {
        currency: "Swiss Franc",
        code: "CHF",
        buy: 11.15,
        sell: 11.35,
        change: 0.04,
      },
      {
        currency: "Canadian Dollar",
        code: "CAD",
        buy: 7.35,
        sell: 7.55,
        change: 0.01,
      },
      {
        currency: "Japanese Yen",
        code: "JPY",
        buy: 0.065,
        sell: 0.071,
        change: -0.001,
      },
    ],
  };

  function getBankName(id: string): string {
    const banks: Record<string, string> = {
      attijariwafa: "Attijariwafa Bank",
      bmce: "BMCE Bank",
      bp: "Banque Populaire",
      sgma: "Société Générale Maroc",
      cih: "CIH Bank",
      cam: "Crédit Agricole du Maroc",
      cdm: "Crédit du Maroc",
      bmci: "BMCI",
      cfg: "CFG Bank",
    };
    return banks[id] || "Unknown Bank";
  }

  return (
    <div className="container py-8">
      <Button variant="ghost" size="sm" className="mb-6" asChild>
        <Link href="/banks">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Banks
        </Link>
      </Button>

      <div className="flex flex-col md:flex-row gap-6 items-start mb-8">
        <img
          src={bankData.logo || "/placeholder.svg"}
          alt={bankData.name}
          className="h-20 w-20 rounded-md object-contain bg-white p-2"
        />
        <div>
          <h1 className="text-3xl font-bold">{bankData.name}</h1>
          <p className="text-muted-foreground">
            Exchange rates last updated: {bankData.lastUpdated}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Exchange Rates</CardTitle>
          <CardDescription>
            Buy and sell rates for foreign currencies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Currency</TableHead>
                <TableHead>Buy (MAD)</TableHead>
                <TableHead>Sell (MAD)</TableHead>
                <TableHead>24h Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bankData.rates.map((rate) => (
                <TableRow key={rate.code}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <CurrencyFlag code={rate.code} className="h-4 w-6" />
                      {rate.currency} ({rate.code})
                    </div>
                  </TableCell>
                  <TableCell>{rate.buy.toFixed(2)}</TableCell>
                  <TableCell>{rate.sell.toFixed(2)}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center ${
                        rate.change > 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {rate.change > 0 ? (
                        <ArrowUp className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDown className="h-3 w-3 mr-1" />
                      )}
                      {Math.abs(rate.change).toFixed(3)}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>About Bank Rates</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              The exchange rates displayed on this page are provided by{" "}
              {bankData.name}. These rates may differ from the official rates
              published by Bank Al-Maghrib and from rates offered by other
              financial institutions.
            </p>
            <p>
              Please note that the actual rate you receive may vary depending on
              the transaction amount, customer relationship, and other factors.
              For the most accurate rates, please contact the bank directly.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
