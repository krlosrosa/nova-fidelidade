import { NextResponse } from "next/server";
import Stripe from "stripe";
import { loadStripe } from "@stripe/stripe-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

export async function POST(req: Request) {
  const { priceId, referenceId, customerId } = await req.json();

  if (!priceId) {
    return NextResponse.json(
      { error: "Price ID is required" },
      { status: 400 }
    );
  }
  try {
    console.log(referenceId)
    const session = await stripe.subscriptions.update('sub_1RTCMPPOQetwSPfGjIHNfZZR',{

      //payment_method_types: ["card"],
     // billing_address_collection: "auto",
      //mode: "subscription",
      //client_reference_id: referenceId,
      //customer: customerId,
      items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      
     // success_url: `${req.headers.get("origin")}/success`,
      //cancel_url: `${req.headers.get("origin")}/`,
    });
    return NextResponse.json({ id: session.id });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}
