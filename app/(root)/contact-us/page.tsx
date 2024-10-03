import ContactUs from '@/components/ContactUs'
import { Metadata } from 'next'
import React from 'react'

export const generateMetadata=():Metadata=>{
  return{
    title:"Contact Us",
    description:"We're here to help with any questions about our AI-powered tools."
    
  }
}

const page = () => {
  return (
    <>
    <ContactUs/>
    </>
  )
}

export default page