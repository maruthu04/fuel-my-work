"use client"
import React, { useState } from "react"
import Script from "next/script"
import { initiate } from "@/actions/useractions" // Import the Server Action

const PaymentPage = ({ username }) => {
    // 1. Manage State Locally
    const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" });

    // Handle input changes
    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
    }

    // Handle the payment process
    const handlePayment = async (amountValue, params) => {
        // Allow passing a specific amount (from buttons) or use the state amount
        const finalAmount = amountValue || paymentform.amount;

        if (!finalAmount || finalAmount <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        try {
            // 2. Call the Server Action
            // We pass the amount, the username (from params), and the form data
            const order = await initiate(finalAmount, username, paymentform);

            // 3. Define Razorpay Options
            var options = {
                "key": process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Client-side key
                "amount": order.amount, 
                "currency": "INR",
                "name": "FuelMyWork", 
                "description": `Payment to ${username}`,
                "image": "https://example.com/your_logo",
                "order_id": order.id, 
                "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay/callback`,
                "prefill": { 
                    "name": paymentform.name || "Guest", 
                    "email": "guest@example.com",
                    "contact": "9999999999" 
                },
                "theme": {
                    "color": "#3399cc"
                }
            };

            // 4. Open Razorpay
            var rzp1 = new window.Razorpay(options);
            rzp1.open();

        } catch (error) {
            console.error("Payment Error:", error);
            alert("Payment failed. Please try again.");
        }
    }

    return ( 
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
            
            <div className="cover-image relative">
                <img className="cover-image w-full h-[350px] object-cover" src="/coverimage.jpg" alt="cover photo" />
                <div className="profile absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                    <img width={140} className='rounded-full bg-slate-600 border-4 border-white' src="/profile.webp" alt="profile" />
                </div>
            </div>

            <div className="writings flex flex-col items-center mt-20 gap-2">
                <div className="name text-4xl font-bold">{username}</div>
                <div className="description text-slate-500">I am Software Developer</div>
                <div className='text-slate-500'>9719 members . 82 posts . 350/Releases </div>
            </div>

            <div className="payment flex gap-8 w-[80%] mx-auto mt-11 mb-20">
                
                {/* Supporters List */}
                <div className="supporters w-1/2 bg-gray-50 border border-gray-400 rounded-xl shadow-sm text-gray-900 p-4">
                    <h2 className='text-2xl font-bold mb-3'>Supporters</h2>
                    <ul className='mx-4 text-lg'>
                        <li className='flex gap-2 items-center mb-2'>
                            <img width={33} src="/avatar.gif" alt="avatar" />
                            Shubham donated <span className='font-bold'>500</span> with a message "Good work"
                        </li>
                        {/* Map through your actual supporters here later */}
                    </ul>
                </div>

                {/* Make Payment Form */}
                <div className="makePayment w-1/2 bg-gray-50 border border-gray-400 rounded-xl shadow-sm text-gray-900 p-4">
                    <h2 className='text-2xl font-bold mb-3'>Make a Payment</h2>
                    
                    <div className="flex flex-col gap-2">
                        <input onChange={handleChange} value={paymentform.name} name="name" type="text" placeholder='Enter Name' className='border border-gray-400 rounded-xl p-2 w-full'/>
                        <input onChange={handleChange} value={paymentform.message} name="message" type="text" placeholder='Enter Message' className='border border-gray-400 rounded-xl p-2 w-full'/>
                    </div>
                    
                    <div className="flex mt-2 gap-2">
                        <input onChange={handleChange} value={paymentform.amount} name="amount" type="number" placeholder='Enter Amount' className='border border-gray-400 rounded-xl p-2 w-[75%]'/>
                        <button 
                            onClick={() => handlePayment()} 
                            className='bg-blue-600 text-white rounded-xl px-4 w-[25%] hover:bg-blue-700 font-bold disabled:opacity-50'
                            disabled={!paymentform.amount}
                        >
                            Pay
                        </button>
                    </div>

                    {/* Quick Pay Buttons */}
                    <div className="amount flex gap-4 mt-6">
                        <button className='border border-blue-600 rounded-xl p-2 bg-blue-100 hover:bg-blue-200 font-bold' onClick={() => handlePayment(100)}>Pay ₹100</button>
                        <button className='border border-blue-600 rounded-xl p-2 bg-blue-100 hover:bg-blue-200 font-bold' onClick={() => handlePayment(500)}>Pay ₹500</button>
                        <button className='border border-blue-600 rounded-xl p-2 bg-blue-100 hover:bg-blue-200 font-bold' onClick={() => handlePayment(1000)}>Pay ₹1000</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage