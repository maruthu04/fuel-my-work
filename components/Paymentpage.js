"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import { initiate, fetchuser, fetchpayments } from "@/actions/useractions";
import { useSession } from "next-auth/react";
import Link from "next/link";

const PaymentPage = ({ username }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [paymentform, setPaymentform] = useState({
    name: "",
    message: "",
    amount: "",
  });
  const [currentUser, setcurrentUser] = useState(null);
  const [supporters, setSupporters] = useState([]);
  const [userNotFound, setUserNotFound] = useState(false);

  useEffect(() => {
    document.title = `${username} | FuelMyWork`;
    getData();
  }, [username]);

  const handleChange = (e) => {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    try {
      let u = await fetchuser(username);
      if (!u) {
        setUserNotFound(true);
        return;
      }
      setcurrentUser(u);
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
  };

  if (userNotFound) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          🚫 User Not Found
        </h1>
        <p className="text-base md:text-lg text-gray-600 mb-8">
          The user <span className="font-bold text-orange-600">@{username}</span> does not exist.
        </p>
        <Link href="/">
          <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3 rounded-full transition-all">
            Go to Home
          </button>
        </Link>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  const handlePayment = async (amountValue) => {
    const finalAmount = amountValue || paymentform.amount;
    if (!finalAmount || finalAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    try {
      const order = await initiate(finalAmount, username, paymentform);
      var options = {
        key: currentUser.razorpayid,
        amount: order.amount,
        currency: "INR",
        name: "FuelMyWork",
        description: `Payment to ${username}`,
        image: "https://example.com/your_logo",
        order_id: order.id,
        handler: async function (response) {
          const verifyRes = await fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            {
              method: "POST",
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
              headers: { "Content-Type": "application/json" },
            }
          );
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            router.push(
              `/payment/success?paymentid=${response.razorpay_payment_id}`
            );
          } else {
            alert("Payment verification failed!");
          }
        },
        prefill: {
          name: paymentform.name || "Guest",
          email: "guest@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      <div className="cover-image relative w-full">
        
        <img
          className="cover-image w-full h-[250px] md:h-[350px] object-cover"
          src={currentUser?.coverpic}
          alt="cover photo"
        />
        
        {session && session.user.email === currentUser?.email && (
          <Link href="/dashboard">
            <button className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-900 font-bold py-2 px-4 md:px-6 text-sm md:text-base rounded-full shadow-lg backdrop-blur-sm border border-gray-200 transition-all z-10 flex items-center gap-2">
              <span>✏️</span> <span className="hidden md:inline">Edit Profile</span><span className="md:hidden">Edit</span>
            </button>
          </Link>
        )}

        <div className="profile absolute -bottom-12 md:-bottom-16 left-1/2 transform -translate-x-1/2">
          
          <img
            className="rounded-full bg-slate-600 border-4 border-white object-cover aspect-square w-24 h-24 md:w-36 md:h-36"
            src={currentUser?.profilepic}
            alt="profile"
          />
        </div>
      </div>

      <div className="writings flex flex-col items-center mt-16 md:mt-20 gap-2 px-4 text-center">
        <div className="name text-2xl md:text-4xl font-bold break-all">
          @{username}
        </div>
        <div className="description text-slate-500 text-sm md:text-base">
          Lets help {username} for a fuel
        </div>
        <div className="text-slate-500 text-sm md:text-base">
          {supporters.length} Payments • ₹
          {supporters.reduce((sum, p) => sum + p.amount, 0)} raised
        </div>
      </div>

      
      <div className="payment flex flex-col md:flex-row gap-6 md:gap-8 w-full md:w-[80%] mx-auto mt-8 md:mt-11 mb-20 px-4 md:px-0">
        
        {/* Supporters List */}
        <div className="supporters w-full md:w-1/2 bg-gray-50 border border-gray-400 rounded-xl shadow-sm text-gray-900 p-4">
          <h2 className="text-xl md:text-2xl font-bold mb-3">Supporters</h2>
          <ul className="mx-0 md:mx-4 text-base md:text-lg max-h-[300px] overflow-y-auto custom-scrollbar">
            {supporters.length === 0 && (
              <p className="text-gray-500 text-center py-4">No supporters yet. Be the first!</p>
            )}
            {supporters.map((p, i) => (
              <li
                key={i}
                className="flex gap-2 items-start md:items-center mb-3 bg-white p-3 rounded-lg border border-gray-200"
              >
                <img width={30} className="mt-1 md:mt-0" src="/avatar.gif" alt="avatar" />
                <span className="text-sm">
                  <span className="font-bold">{p.name}</span> donated
                  <span className="font-bold text-green-600">
                    {" "}
                    ₹{p.amount}
                  </span>{" "}
                  with a message:
                  <span className="italic text-gray-600"> "{p.message}"</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Make Payment Form */}
        <div className="makePayment w-full md:w-1/2 bg-gray-50 border border-gray-400 rounded-xl shadow-sm text-gray-900 p-4">
          <h2 className="text-xl md:text-2xl font-bold mb-3">Make a Payment</h2>

          <div className="flex flex-col gap-3">
            <input
              onChange={handleChange}
              value={paymentform.name}
              name="name"
              type="text"
              placeholder="Enter Name"
              className="border border-gray-400 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              onChange={handleChange}
              value={paymentform.message}
              name="message"
              type="text"
              placeholder="Enter Message"
              className="border border-gray-400 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex mt-3 gap-2">
            <input
              onChange={handleChange}
              value={paymentform.amount}
              name="amount"
              type="number"
              placeholder="Enter Amount"
              className="border border-gray-400 rounded-xl p-3 w-full md:w-[75%] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => handlePayment()}
              className="bg-blue-600 text-white rounded-xl px-4 w-[30%] md:w-[25%] hover:bg-blue-700 font-bold disabled:opacity-50 transition-colors"
              disabled={!paymentform.amount}
            >
              Pay
            </button>
          </div>

          <div className="amount flex flex-wrap gap-3 mt-6">
            <button
              className="flex-1 border border-blue-600 rounded-xl p-2 bg-blue-100 hover:bg-blue-200 font-bold text-sm md:text-base transition-colors"
              onClick={() => handlePayment(100)}
            >
              Pay ₹100
            </button>
            <button
              className="flex-1 border border-blue-600 rounded-xl p-2 bg-blue-100 hover:bg-blue-200 font-bold text-sm md:text-base transition-colors"
              onClick={() => handlePayment(500)}
            >
              Pay ₹500
            </button>
            <button
              className="flex-1 border border-blue-600 rounded-xl p-2 bg-blue-100 hover:bg-blue-200 font-bold text-sm md:text-base transition-colors"
              onClick={() => handlePayment(1000)}
            >
              Pay ₹1000
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;