import { useQuery } from "@tanstack/react-query";

export function useSubscriptionPlan(customerId: string) {
  return useQuery({
    queryKey: ["subscriptionPlan", customerId],
    queryFn: async () => {
      const res = await fetch("/api/stripe/subscription", {
        headers: { "x-customer-id": customerId },
      });
      const data = await res.json();
      return data;
    },
  });
}
