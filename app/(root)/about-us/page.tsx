import AboutUs from "@/components/AboutUs";
import { Metadata } from "next";
import React from "react";

export const generateMetadata=():Metadata=>{
  return{
    title:"About Us",
    description:"Empowering creativity through cutting-edge AI solutions for image, video, and text."
    
  }
}

const About = () => {
  return (
    <div className="py-16 bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-2xl mx-auto text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 sm:text-4xl">
          About Artifixer
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          Empowering creativity through cutting-edge AI solutions for image, video, and text.
        </p>
      </div>
      <div className="mt-12">
        <AboutUs />
      </div>
    </div>
  );
};

export default About;
