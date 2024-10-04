"use client"
import AIPowerTools from "@/components/AIPowerTools";
import BeforeAfterBanner from "@/components/BeforeAfterBanner";
import Testimonials from "@/components/Testimonials";
import TryTools from "@/components/TryTools";
import { aiPoweredTools} from "@/constants";

export default function Home() {
  console.log(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)
  console.log(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME)
  console.log(process.env.NEXT_PUBLIC_SERVER_URL)
  console.log(process.env.CLERK_SECRET_KEY)

  return (
    <>
      <BeforeAfterBanner />
      <AIPowerTools items={aiPoweredTools} />
      <TryTools />
      <Testimonials />
    </>
  );
} 
