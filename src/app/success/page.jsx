import React from "react";
import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) throw new Error("Invalid Session");

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["payment_intent", "subscription"],
  });

  if (session.status === "open") return redirect("/");

  // পেমেন্ট সেভ করার লজিক
  if (session.status === "complete") {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/payments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: session.metadata.userEmail,
          userId: session.metadata.userId,
          amount: session.amount_total / 100,
          recipeId: session.metadata.recipeId !== "N/A" ? session.metadata.recipeId : null,
          transactionId: session.subscription 
            ? (typeof session.subscription === "string" ? session.subscription : session.subscription.id) 
            : (typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id),
          paymentStatus: "paid"
        }),
      });
      if (!response.ok) console.error("Database update failed");
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0f121e] p-4">
      <div className="max-w-md w-full bg-white dark:bg-[#161a29] rounded-3xl shadow-2xl p-8 text-center border border-gray-100 dark:border-gray-800">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full">
            <FaCheckCircle className="text-5xl text-green-500" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Payment Successful! 🎉</h1>
        
        <div className="bg-gray-50 dark:bg-[#1f2437] rounded-2xl p-4 mb-8 text-left border border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">Transaction ID</div>
          <div className="flex justify-between items-center mt-1">
            <span className="font-mono text-sm text-gray-800 dark:text-gray-200 truncate mr-4">
              {session.subscription 
                ? (typeof session.subscription === "string" ? session.subscription : session.subscription.id) 
                : (typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id || "N/A")}
            </span>
            <span className="font-bold text-gray-900 dark:text-white">${(session.amount_total / 100).toFixed(2)}</span>
          </div>
        </div>
        <Link href="/dashboard/user" className="block w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl transition-all">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}