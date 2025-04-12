import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowDown, ArrowUp, ChevronLeft, Clock, MapPin, Phone, Star } from "lucide-react"
import Link from "next/link"
import CurrencyFlag from "@/components/currency-flag"

export default function ExchangeOfficePage({ params }: { params: { id: string } }) {
  // In a real app, this data would be fetched from an API based on the exchange office ID
  const officeData = {
    id: params.id,
    name: getOfficeName(params.id),
    location: "Casablanca",
    address: "123 Hassan II Boulevard, Casablanca",
    phone: "+212 522 123 456",
    hours: "Monday - Saturday: 9:00 AM - 6:00 PM",
    rating: 4.5,
    reviews: 120,
    lastUpdated: "Today at 2:30 PM",
    rates: [
      { currency: "US Dollar", code: "USD", buy: 10.0, sell: 10.2, change: 0.03 },
      { currency: "Euro", code: "EUR", buy: 11.1, sell: 11.3, change: -0.02 },
      { currency: "British Pound", code: "GBP", buy: 12.8, sell: 13.0, change: 0.06 },
      { currency: "Swiss Franc", code: "CHF", buy: 11.2, sell: 11.4, change: 0.05 },
      { currency: "Canadian Dollar", code: "CAD", buy: 7.4, sell: 7.6, change: 0.02 },
      { currency: "Japanese Yen", code: "JPY", buy: 0.067, sell: 0.073, change: -0.001 },
    ],
  }

  function getOfficeName(id: string): string {
    const offices: Record<string, string> = {
      exchange1: "Global Exchange Morocco",
      exchange2: "Marrakech Currency Exchange",
      exchange3: "Tangier Money Exchange",
      exchange4: "Fes Currency Services",
      exchange5: "Rabat Exchange Center",
      exchange6: "Agadir Money Exchange",
    }
    return offices[id] || "Unknown Exchange Office"
  }

  return (
    <div className="container py-8">
      <Button variant="ghost" size="sm" className="mb-6" asChild>
        <Link href="/exchange-offices">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Exchange Offices
        </Link>
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-2">{officeData.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center text-yellow-500">
              <Star className="h-4 w-4 fill-current" />
              <span className="ml-1 font-medium">{officeData.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">({officeData.reviews} reviews)</span>
          </div>
          <p className="text-muted-foreground mb-4">Exchange rates last updated: {officeData.lastUpdated}</p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{officeData.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{officeData.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{officeData.hours}</span>
            </div>
          </div>
        </div>
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-square bg-muted rounded-md flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Map would be displayed here</p>
              </div>
              <Button className="w-full mt-4">Get Directions</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Exchange Rates</CardTitle>
          <CardDescription>Buy and sell rates for foreign currencies</CardDescription>
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
              {officeData.rates.map((rate) => (
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
                    <span className={`inline-flex items-center ${rate.change > 0 ? "text-green-500" : "text-red-500"}`}>
                      {rate.change > 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                      {Math.abs(rate.change).toFixed(3)}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
