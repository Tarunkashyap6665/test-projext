"use client"
import { toast } from "@/hooks/use-toast";
import React, { useState } from "react";
import { FaUser, FaEnvelope, FaComment} from "react-icons/fa";
import { FiRotateCw } from "react-icons/fi";
import { MdEmail } from "react-icons/md";



const ContactUs = ({ title = "Contact Us" }: { title?: string }) => {
  const [formData, setFormData] = useState({} as FormDataProps);
  const [errors, setErrors] = useState({} as ErrorProps);
  const [isSending, setIsSending] = useState(false)

  const subjects = [
    "General Inquiry",
    "Technical Support",
    "Billing",
    "Feature Request",
    "Other",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    let newValue: string | boolean = value;

    // Handle checkbox specifically
    if (type === "checkbox") {
      newValue = (e.target as HTMLInputElement).checked; // Cast to HTMLInputElement to access checked
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));

    validateField(name, newValue);
  };



  const validateField = (name: string, value: string | boolean) => {
    const newErrors = { ...errors };

    switch (name) {
      case "name":
        if (typeof value === "string" && !value.trim()) {
          newErrors.name = "Name is required";
        } else {
          delete newErrors.name;
        }
        break;

      case "email":
        if (typeof value === "string") {
          if (!value.trim()) {
            newErrors.email = "Email is required";
          } else if (!/\S+@\S+\.\S+/.test(value)) {
            newErrors.email = "Invalid email format";
          } else {
            delete newErrors.email;
          }
        }
        break;

      case "subject":
        if (!value) {
          newErrors.subject = "Subject is required";
        } else {
          delete newErrors.subject;
        }
        break;

      case "message":
        if (typeof value === "string" && !value.trim()) {
          newErrors.message = "Message is required";
        } else {
          delete newErrors.message;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true)
    const newErrors: ErrorProps = {};
    (Object.keys(formData) as (keyof FormDataProps)[]).forEach((key) => {
      if (key !== "subscribe" && !formData[key]) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    });
    if (Object.keys(newErrors).length === 0) {
      await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(formData),
      });
      setIsSending(false)
      toast({
        title: `Send successfully`,
        duration: 5000,
        className: 'success-toast'

      })
      // Here you would typically send the form data to your backend
    } else {
      setErrors(newErrors);
    }
  };



  return (
    <div className="min-h-screen bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            We&apos;re here to help with any questions about our AI-powered tools.
          </p>
        </div>
        <div className="mt-12">
          <div className="flex flex-col md:flex-row md:justify-center gap-8">
            <div className="bg-white shadow w-full md:w-[80%] lg:w-1/2 overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-xl md:text-2xl text-center font-semibold leading-6 text-gray-900">
                  Send us a message
                </h3>
                <form onSubmit={handleSubmit} className="mt-5 space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className={`block w-full pl-10 sm:text-sm border-gray-300 rounded-md ${errors.name ? "border-red-300" : ""
                          }`}
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleInputChange}
                        aria-invalid={errors.name ? "true" : "false"}
                        aria-describedby={errors.name ? "name-error" : undefined} required
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-600" id="name-error">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className={`block w-full pl-10 sm:text-sm border-gray-300 rounded-md ${errors.email ? "border-red-300" : ""
                          }`}
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        aria-invalid={errors.email ? "true" : "false"}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        required
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${errors.subject ? "border-red-300" : ""
                        }`}
                      value={formData.subject}
                      onChange={handleInputChange}
                      aria-invalid={errors.subject ? "true" : "false"}
                      aria-describedby={errors.subject ? "subject-error" : undefined}
                      required
                    >
                      <option value="">Select a subject</option>
                      {subjects.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                    {errors.subject && (
                      <p className="mt-2 text-sm text-red-600" id="subject-error">
                        {errors.subject}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                        <FaComment
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className={`block w-full pl-10 sm:text-sm border-gray-300 rounded-md ${errors.message ? "border-red-300" : ""
                          }`}
                        placeholder="Your message"
                        value={formData.message}
                        onChange={handleInputChange}
                        aria-invalid={errors.message ? "true" : "false"}
                        aria-describedby={errors.message ? "message-error" : undefined}
                        required
                      />
                    </div>
                    {errors.message && (
                      <p className="mt-2 text-sm text-red-600" id="message-error">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <button
                      type="submit"
                      className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  ${isSending?"bg-indigo-200":"bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"}`}
                      disabled={isSending}
                    >
                      {isSending?<FiRotateCw className="animate-spin text-4xl text-white font-semibold mr-2  w-4 h-4" />
                      :"Send Message"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="bg-white shadow w-full md:w-[80%] lg:w-1/2 overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-xl md:text-2xl text-center font-semibold leading-6 text-gray-900">
                  Contact Information
                </h3>
                <div className="mt-5 space-y-6">
                  <p className="text-sm text-gray-500">
                    If you prefer to reach out directly, you can use the following
                    contact information:
                  </p>
                  <div className="flex items-center mb-4">
                    <MdEmail className="text-indigo-600 text-2xl mr-4" />
                    <span className="text-gray-900">
                      support@artifixer.tech
                    </span>
                  </div>
                  {/* <div className="flex items-center mb-4">
                    <MdPhone className="text-indigo-600 text-2xl mr-4" />
                    <span>+91 9171510504</span>
                  </div> */}
                  {/* <div>
                    <h4 className="text-sm font-medium text-gray-900">Address</h4>
                    <p className="mt-2 text-sm text-gray-500">
                      City Heart Residency, Kailashpuri, Raipur, Chhattisgarh
                    </p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ContactUs;
