import React from 'react'
import Link from 'next/link'
import { SignedOut } from '@clerk/nextjs'
import BackgroundRemoval from './BackgroundRemoval'

const TryTools = () => {
    return (
        <div className='bg-gradient-to-br from-purple-100 to-indigo-200' id='trytools'>
            <div className="max-w-screen-lg mx-auto md:px-4 py-12 ">
                <section className="bg-gray-100 rounded-lg shadow-xl p-8 my-16">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">
                        Try Background Removal
                    </h3>
                    <BackgroundRemoval/>
                </section>
                <SignedOut>
                <section className="text-center mb-16">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        Ready to transform your images?
                    </h3>
                    <p className="text-xl text-gray-600 mb-8">
                        Sign up now and get access to all our AI-powered image tools!
                    </p>
                    <Link
                        href="/sign-up"
                        className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition duration-300"
                    >
                        Sign Up
                    </Link>
                </section>
                </SignedOut>
            </div>
            
        </div>
    )
}

export default TryTools