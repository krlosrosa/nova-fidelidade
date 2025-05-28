// /app/api/stripe/subscription/route.ts
import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

export async function GET(req: Request) {
  const customerId = req.headers.get("x-customer-id");

  if (!customerId) {
    return NextResponse.json({ error: "Missing customer ID" }, { status: 400 });
  }

  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: "all",
    expand: ["data.items.data"],
    limit: 1,
  });

  const subscription = subscriptions.data[0];

  if (!subscription) {
    return NextResponse.json({ error: "No subscription found" }, { status: 404 });
  }

  const item = subscription.items.data[0];
  const product = item.price.product as Stripe.Product;

  return NextResponse.json({
    status: subscription.status,
    price: (item.price.unit_amount ?? 0) / 100,
    name: product.name,
    id: product.id,
    features: getFeaturesByProductId(product.id),
  });
}

function getFeaturesByProductId(productId: string): string[] {
  // Mapeia manualmente os recursos com base no ID do produto
  switch (productId) {
    case "prod_premium":
      return ["10 usuários", "Suporte prioritário", "Acesso a todos os recursos"];
    case "prod_basic":
      return ["1 usuário", "Suporte padrão", "Funcionalidades básicas"];
    default:
      return ["Recursos padrão"];
  }
}
