import CookiesPolicy from "@/components/CookiesPolicy";
import { Metadata } from "next";
import React from "react";

export const generateMetadata=():Metadata=>{
  return{
    title:"Cookies Policy",
    robots:{
      index:false,
      follow:true
    }
  }
}

const page = () => {
  return (
    <div className=" py-16  bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            COOKIES POLICY
          </h2>
          <p className="mt-4 text-lg text-gray-500">Last Updated September 29, 2024</p>
        </div>
        <div className="mt-12">
          <CookiesPolicy />
        </div>
      </div>
    </div>
  );
};

export default page;
