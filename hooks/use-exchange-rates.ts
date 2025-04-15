import { useEffect, useState } from "react";

export type Rate = {
  code: string;
  rate: number;
  change: number;
};

export function useExchangeRates() {
  const [rates, setRates] = useState<Rate[]>([]);
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    async function fetchRates() {
      try {
        const res = await fetch("/api/rates");
        const data = await res.json();
        setRates(data.rates);
        setDate(data.date);
      } catch (err) {
        console.error("Error fetching rates:", err);
      }
    }

    fetchRates();
  }, []);

  return { rates, date };
}
