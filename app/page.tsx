"use client";

// pages
import Homepage from "@/components/pages/homepage";
import WaitlistPage from "@/app/waitlist/page";

export default function Home() {
  if (process.env.NEXT_PUBLIC_ENABLE_WAITLIST === "true") {
    return <WaitlistPage />;
  }
  return <Homepage />;
}
