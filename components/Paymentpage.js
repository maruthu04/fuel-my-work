"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from "react"
import Script from "next/script"
import { initiate, fetchuser, fetchpayments } from "@/actions/useractions" // Import the Server Action
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const PaymentPage = ({ username }) => {
    const { data: session } = useSession();
    const router = useRouter()
    // 1. Manage State Locally
    const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" });
    const [currentUser, setcurrentUser] = useState({})
    const [supporters, setSupporters] = useState([])
    // const [payments, setPayments] = useState([])

    useEffect(() => {
        getData()
    }, [])

    // Handle input changes
    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
    }

    const getData = async () => {
        try {
            // ✅ FIX 1: Fetch the user data and update state
            let u = await fetchuser(username);
            setcurrentUser(u);

            // ✅ FIX 2: Fetch payments (existing logic)
            let dbPayments = await fetchpayments(username);
            
            if (!Array.isArray(dbPayments)) {
                setSupporters([]);
            } else {
                setSupporters(dbPayments);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setSupporters([]);
        }
    }

    const handlePayment = async (amountValue) => {
        const finalAmount = amountValue || paymentform.amount;

        if (!finalAmount || finalAmount <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        try {
            // 1. Create Order
            const order = await initiate(finalAmount, username, paymentform);

            // 2. Define Options
            var options = {
                "key": currentUser.razorpayid, 
                "amount": order.amount, 
                "currency": "INR",
                "name": "FuelMyWork", 
                "description": `Payment to ${username}`,
                "image": "https://example.com/your_logo",
                "order_id": order.id, 
                
                // 👇 THIS IS THE MISSING PART (The Handler)
                handler: async function (response) {
                    
                    // A. Send proof to backend for verification
                    const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/razorpay`, {
                        method: "POST",
                        body: JSON.stringify({
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                        }),
                        headers: { "Content-Type": "application/json" },
                    });

                    const verifyData = await verifyRes.json();

                    // B. Handle Result
                    if (verifyData.success) {
                        router.push(`/payment/success?paymentid=${response.razorpay_payment_id}`)
                    } else {
                        alert("Payment verification failed!");
                    }
                },
                
                "prefill": { 
                    "name": paymentform.name || "Guest", 
                    "email": "guest@example.com",
                    "contact": "9999999999" 
                },
                "theme": {
                    "color": "#3399cc"
                }
            };

            // 3. Open Razorpay
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
                <img className="cover-image w-full h-[350px] object-cover" src={currentUser?.coverpic} alt="cover photo" />
                {session && session.user.email === currentUser?.email && (
        <Link href="/dashboard">
            <button className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-900 font-bold py-2 px-6 rounded-full shadow-lg backdrop-blur-sm border border-gray-200 transition-all z-10 flex items-center gap-2">
                <span>✏️</span> Edit Profile
            </button>
        </Link>
    )}
                <div className="profile absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                    <img width={140} height={140} className='rounded-full bg-slate-600 border-4 border-white object-cover aspect-square' src={currentUser?.profilepic}  alt="profile" />
                </div>
            </div>

            <div className="writings flex flex-col items-center mt-20 gap-2">
                <div className="name text-4xl font-bold">@{username}</div>
                <div className="description text-slate-500">Lets help {username} for a fuel</div>
                <div className='text-slate-500'>{supporters.length} Payments .  ₹{supporters.reduce((sum, p) => sum + p.amount, 0)} raised</div>
            </div>

            <div className="payment flex gap-8 w-[80%] mx-auto mt-11 mb-20">
                
                {/* Supporters List */}
                <div className="supporters w-1/2 bg-gray-50 border border-gray-400 rounded-xl shadow-sm text-gray-900 p-4">
                    <h2 className='text-2xl font-bold mb-3'>Supporters</h2>
                    <ul className='mx-4 text-lg max-h-[300px] overflow-y-auto custom-scrollbar'>
                        {supporters.length === 0 && <p className="text-gray-500">No supporters yet. Be the first!</p>}
                        {supporters.map((p, i) => (
                            <li key={i} className='flex gap-2 items-center mb-3 bg-white p-3 rounded-lg border border-gray-200'>
                                <img width={35} src="/avatar.gif" alt="avatar" />
                                <span className="text-sm">
                                    <span className="font-bold">{p.name}</span> donated 
                                    <span className="font-bold text-green-600"> ₹{p.amount}</span> with a message: 
                                    <span className="italic text-gray-600"> "{p.message}"</span>
                                </span>
                            </li>
                        ))}
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