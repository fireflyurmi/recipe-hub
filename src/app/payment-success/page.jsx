import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";

export default async function PaymentSuccessPage({ searchParams }) {
  const { session_id } = await searchParams;
  if (!session_id) redirect("/");

  const session = await stripe.checkout.sessions.retrieve(session_id);

  if (session.status === "complete") {
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/payments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail: session.metadata.userEmail,
        userId: session.metadata.userId,
        amount: session.amount_total / 100,
        recipeId: session.metadata.recipeId,
        transactionId: session.payment_intent,
        paymentStatus: "paid",
      }),
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-10 bg-white shadow-xl rounded-2xl">
        <FaCheckCircle className="text-5xl text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold">Payment Successful!</h1>
        <a
          href="/dashboard/user"
          className="mt-4 block bg-purple-600 text-white py-2 px-6 rounded-lg"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}
