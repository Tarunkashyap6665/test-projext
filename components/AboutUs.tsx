"use client"
import React from "react";
import { FaGithub, FaGoogle, FaLinkedin } from "react-icons/fa";
import ContactUs from "./ContactUs";
import { teamMembers } from "@/constants";
import Image from "next/image";

const AboutUs = () => {
  

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Introduction Section */}
      <section className="py-16 bg-white container">
        <div className="container mx-auto px-4">
          <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center">
            At Artifixer, we&apos;re on a mission to revolutionize content creation and analysis through cutting-edge AI technology. Our platform offers a suite of powerful tools for image, video, and text processing, designed to enhance creativity and boost productivity for individuals and businesses alike.

          </p>
        </div>
      </section>



      {/* AI Tools Section */}
      <section className="py-16 bg-transparent">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-2xl font-semibold mb-4">Free Tools</h3>
              <ul className="list-disc list-inside">
                <li>Basic Image Enhancement</li>
                <li>Text Summarization</li>
                <li>Video Thumbnail Generator</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-2xl font-semibold mb-4">Premium Tools</h3>
              <ul className="list-disc list-inside">
                <li>Advanced Image Editing with AI</li>
                <li>Video Content Analysis</li>
                <li>AI-Powered Content Generation</li>
                <li>Custom AI Model Training</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-6">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md md:col-start-2 p-6 py-24 w-full">
              <Image src={member.image} alt={member.name} width={8000} height={8000} className="w-32 h-32 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-center">{member.name}</h3>
              <p className="text-gray-600 text-center mb-4">{member.role}</p>
              <div className="flex justify-center space-x-4">
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                  <FaLinkedin size={24} />
                </a>
                <a href={member.gmail} target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-600">
                  <FaGoogle size={24} />
                </a>
                <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-600">
                  <FaGithub size={24} />
                </a>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="">
        <ContactUs title="Get in Touch"/>
      </section>


    </div>
  );
};

export default AboutUs;