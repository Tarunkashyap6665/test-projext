import { SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
  return (
    <SignUp fallbackRedirectUrl={"/"} signInFallbackRedirectUrl={"/"}/>
  )
}

export default SignUpPage