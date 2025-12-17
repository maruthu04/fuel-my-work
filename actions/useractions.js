"use server"

import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import User from "@/models/User" 
import connectDb from "@/db/connectDb"

export const initiate = async (amount, to_username, paymentform) => {
    await connectDb();

    // 1. Find the user
    // Make sure 'to_username' matches exactly what is in your DB (case-sensitive!)
    const user = await User.findOne({ username: to_username });

    // 2. CRITICAL CHECK: Stop if user doesn't exist
    if (!user) {
        // This prevents the "Cannot read properties of null" crash
        throw new Error(`User '${to_username}' not found in database. Cannot process payment.`);
    }

    // 3. Initialize Razorpay
    var instance = new Razorpay({ 
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
        key_secret: process.env.RAZORPAY_KEY_SECRET 
    });

    let options = {
        amount: Number.parseInt(amount) * 100, 
        currency: "INR",
    }

    let x = await instance.orders.create(options);

    // 4. Save to DB
    await Payment.create({
        oid: x.id, 
        amount: amount, 
        to_user: user._id, // This is safe now because we checked 'if (!user)' above
        name: paymentform.name || "Anonymous", 
        message: paymentform.message, 
        paid: false 
    });

    return x;
}