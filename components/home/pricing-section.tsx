"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, CheckIcon } from "lucide-react";

declare global {
  interface Window {
    Razorpay:any;
  }
}

type PriceType = {
  name: string;
  price: number;
  description: string;
  items: string[];
  id: string;
};

const plans: PriceType[] = [
  {
    name: "Basic",
    price: 0,
    description: "Perfect for occasional use",
    items: [
      "5 PDF summaries per month",
      "Standard processing speed",
      "Email support",
    ],
    id: "basic",
  },
  {
    name: "Pro",
    price: 199,
    description: "For professionals and teams",
    items: ["Unlimited PDF summaries", "Priority processing"],
    id: "pro",
  },
];

const handlePayment = async (plan: PriceType) => {
  if (plan.price === 0) {
    alert("You are already on the Free plan");
    return;
  }

  const res = await fetch("/api/razorpay/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount: plan.price }),
  });

  const order = await res.json();

  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    amount: order.amount,
    currency: "INR",
    order_id: order.id,
    name: "BrieflyAI",
    description: `${plan.name} Plan`,
    handler: () => {
      alert("Payment successful (TEST MODE)");
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

const PricingCard = ({ name, price, description, items, id }: PriceType) => {
  return (
    <div className="relative w-full max-w-lg hover:scale-105 transition-all duration-300">
      <div
        className={cn(
          "relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 border border-gray-500/20 rounded-2xl",
          id === "pro" && "border-rose-500 gap-5 border-2"
        )}
      >
        <div>
          <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
          <p className="text-sm text-gray-400">{description}</p>
        </div>

        <div className="flex gap-2">
          <p className="text-5xl tracking-tight font-extrabold">₹{price}</p>
          <div className="flex flex-col justify-end mb-1">
            <p className="text-xs">/month</p>
          </div>
        </div>

        <ul className="space-y-2.5 leading-relaxed text-base flex-1">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <CheckIcon size={18} />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={() =>
            handlePayment({ name, price, description, items, id })
          }
          className={cn(
            "w-full rounded-full flex items-center justify-center gap-2 text-white border-2 py-2",
            id === "pro"
              ? "bg-linear-to-r from-rose-800 to-rose-500 border-rose-900"
              : "bg-linear-to-r from-rose-400 to-rose-500 border-rose-100"
          )}
        >
          Buy Now <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default function PricingSection() {
  return (
    <section className="relative overflow-hidden" id="pricing">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center w-full pb-12">
          <h2 className="uppercase font-bold text-xl text-rose-500">
            Pricing
          </h2>
        </div>

        <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
          {plans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
