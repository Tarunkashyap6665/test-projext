import { PricingCard } from "@/components/PricingCard";
import { plans } from "@/constants";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import React from "react";

export const generateMetadata = (): Metadata => {
  return {
    title: "Pricing",
    description:"Choose the plan that's right for you and get started with our powerful AI tools."

  }
}

const page = () => {
  const { userId } = auth();

  let userPlan: boolean;

  if (!userId) {
    userPlan = false
  }
  else {
    userPlan = true
  }


  return (
    <div className="py-16 bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Pricing
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Choose the plan that's right for you and get started with our
            powerful AI tools.
          </p>
        </div>
        <div className="mt-12">
          <PricingCard userPlan={userPlan} plans={plans} />

        </div>
      </div>
    </div>
  );
};

export default page;
