"use client"
import React, { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

// 1. Create a sub-component for the content that uses search params
const SuccessContent = () => {
    const searchParams = useSearchParams()
    const paymentid = searchParams.get('paymentid')

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full border border-gray-100">
                <div className="mb-4">
                    {/* Green Checkmark Icon */}
                    <svg className="w-20 h-20 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
                <p className="text-gray-500 mb-6">Thank you for your generous donation.</p>
                
                <div className="bg-gray-50 p-4 rounded-lg text-left mb-6">
                    <p className="text-sm text-gray-500">Payment ID:</p>
                    <p className="font-mono font-bold text-gray-700 break-all">{paymentid}</p>
                </div>

                <Link href="/" className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all">
                    Go to Home
                </Link>
            </div>
        </div>
    )
}

// 2. Main component wraps everything in Suspense
const Success = () => {
    return (
        <Suspense fallback={<div className="min-h-screen flex justify-center items-center">Loading...</div>}>
            <SuccessContent />
        </Suspense>
    )
}

export default Success