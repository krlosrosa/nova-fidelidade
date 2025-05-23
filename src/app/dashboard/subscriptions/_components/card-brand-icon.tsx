import { CreditCard } from "lucide-react";


export function CardBrandIcon({ brand }: { brand: string }) {
  switch (brand.toLowerCase()) {
    case "visa":
      return <CreditCard className="h-8 w-8" />;
    case "mastercard":
      return <CreditCard className="h-8 w-8" />;
    case "amex":
      return <CreditCard  className="h-8 w-8" />;
    default:
      return <CreditCard className="h-8 w-8" />;
  }
}