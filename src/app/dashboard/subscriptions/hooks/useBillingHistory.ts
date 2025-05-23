// hooks/useBillingHistory.ts
import { useQuery } from "@tanstack/react-query";

export function useBillingHistory(customerId: string) {
  return useQuery({
    queryKey: ["billingHistory", customerId],
    queryFn: async () => {
      const res = await fetch("/api/stripe/invoices", {
        headers: { "x-customer-id": customerId },
      });
      const data = await res.json();
      return data;
    },
  });
}
