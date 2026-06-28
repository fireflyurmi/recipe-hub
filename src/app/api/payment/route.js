import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe"; 
import { auth } from "@/lib/auth";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const price = formData.get("price");
    const title = formData.get("title");
    const recipeId = formData.get("recipeId");

    const headersList = await headers();
    const origin = headersList.get("origin");
    const userSession = await auth.api.getSession({ headers: headersList });
    const user = userSession?.user;

    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: Math.round(Number(price) * 100),
            product_data: { name: title },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: user.id,
        userEmail: user.email,
        recipeId: recipeId,
        paymentType: "one-time",
      },
      mode: "payment",
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
