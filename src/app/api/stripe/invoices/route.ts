// /app/api/stripe/invoices/route.ts (Next.js App Router)
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

export async function GET(req: Request) {
  const customerId = req.headers.get("x-customer-id"); // ou query params



  if (!customerId) {
    return NextResponse.json({ error: "Missing customer ID" }, { status: 400 });
  }

  const invoices = await stripe.invoices.list({
    customer: customerId,
    limit: 10,
  });

  return NextResponse.json(invoices.data);
}
