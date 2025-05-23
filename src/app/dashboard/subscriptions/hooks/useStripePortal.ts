// hooks/useStripePortal.ts
export async function redirectToStripePortal(customerId: string) {
  const res = await fetch("/api/stripe/portal", {
    method: "POST",
    body: JSON.stringify({ customerId }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  if (data?.url) {
    window.location.href = data.url;
  } else {
    alert("Erro ao redirecionar para o portal do Stripe.");
  }
}
