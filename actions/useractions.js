// "use server"

// import Razorpay from "razorpay"
// import Payment from "@/models/Payment"
// import User from "@/models/User" 
// import connectDb from "@/db/connectDb"

// export const initiate = async (amount, to_username, paymentform) => {
//     await connectDb();

//     // 1. Find the user
//     // Make sure 'to_username' matches exactly what is in your DB (case-sensitive!)
//     const user = await User.findOne({ username: to_username });

//     // 2. CRITICAL CHECK: Stop if user doesn't exist
//     if (!user) {
//         // This prevents the "Cannot read properties of null" crash
//         throw new Error(`User '${to_username}' not found in database. Cannot process payment.`);
//     }

//     // 3. Initialize Razorpay
//     var instance = new Razorpay({ 
//         key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
//         key_secret: process.env.RAZORPAY_KEY_SECRET 
//     });

//     let options = {
//         amount: Number.parseInt(amount) * 100, 
//         currency: "INR",
//     }

//     let x = await instance.orders.create(options);

//     // 4. Save to DB
//     await Payment.create({
//         oid: x.id, 
//         amount: amount, 
//         to_user: user._id, // This is safe now because we checked 'if (!user)' above
//         name: paymentform.name || "Anonymous", 
//         message: paymentform.message, 
//         paid: false 
//     });

//     return x;
// }


// export const fetchuser = async (username) => {
//     await connectDb();
//     console.log(username)
//     let u = await User.findOne({username: username});
//     let user = u.toObject({flattenObjectsId: true});
//     return user;
// }


// export const fetchpayments = async (username) => {
//     await connectDb();
//     let payments = await Payment.find({to_user: to_user, paid: true}).sort({createdAt: -1}).lean();
//     return payments;
// }


// "use server"

// import Razorpay from "razorpay"
// import Payment from "@/models/Payment"
// import User from "@/models/User"
// import connectDb from "@/db/connectDb"

// // 1. Function to initiate payment (already discussed previously)
// export const initiate = async (amount, to_username, paymentform) => {
//     await connectDb();
//     const user = await User.findOne({ username: to_username });

//     if (!user) {
//         throw new Error("Recipient user not found");
//     }

//     var instance = new Razorpay({ 
//         key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
//         key_secret: process.env.RAZORPAY_KEY_SECRET 
//     });

//     let options = {
//         amount: Number.parseInt(amount) * 100, 
//         currency: "INR",
//     }

//     let x = await instance.orders.create(options);

//     await Payment.create({
//         oid: x.id, 
//         amount: amount, 
//         to_user: to_username, // Store username directly
//         name: paymentform.name || "Anonymous", 
//         message: paymentform.message, 
//         done: false 
//     });

//     return x;
// }

// // 2. Fetch User Details (Fixing the Serialization Error)
// export const fetchuser = async (username) => {
//     await connectDb();
    
//     // .lean() converts the complex Mongoose object to a plain JavaScript object
//     // This fixes the "Only plain objects can be passed..." error
//     let u = await User.findOne({ username: username }).lean();
    
//     if (!u) {
//         return null;
//     }
    
//     // We also need to flatten the ID to a string because ObjectIds can't be passed to client
//     u._id = u._id.toString();
    
//     return u;
// }

// // 3. Fetch Payments (Fixing the CastError)
// export const fetchpayments = async (username) => {
//     await connectDb();
    
//     // Step A: Find the user first to get their ID
//     const user = await User.findOne({ username: username }).lean();

//     if (!user) {
//         return []; // Return empty list if user doesn't exist
//     }

//     // Step B: Use the user's _id to find payments (Fixes "Cast to ObjectId failed")
//     // We also filter by 'done: true' so we only show successful payments
//     let payments = await Payment.find({ to_user: username, done: true })
//         .sort({ amount: -1 }) // Sort by highest amount first (optional)
//         .lean();

//     // Step C: Serialize the data for the client
//     // Convert ObjectIds to strings so React doesn't crash
//     return payments.map(p => {
//         p._id = p._id.toString();
//         p.to_user = p.to_user.toString();
//         return p;
//     });
// }


"use server"

import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import User from "@/models/User"
import connectDb from "@/db/connectDb"

export const initiate = async (amount, to_username, paymentform) => {
    await connectDb();
    
    // We still check if the user exists to be safe
    const user = await User.findOne({ username: to_username });

    if (!user) {
        throw new Error("Recipient user not found");
    }

    var instance = new Razorpay({ 
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
        key_secret: process.env.RAZORPAY_KEY_SECRET 
    });

    let options = {
        amount: Number.parseInt(amount) * 100, 
        currency: "INR",
    }

    let x = await instance.orders.create(options);

    // Save to DB
    await Payment.create({
        oid: x.id, 
        amount: amount, 
        to_user: to_username, // 👈 NOW SAVING USERNAME STRING (e.g. "maruthuaarambh")
        name: paymentform.name || "Anonymous", 
        message: paymentform.message || "Great content!", 
        done: false 
    });

    return x;
}

export const fetchuser = async (username) => {
    await connectDb();
    let u = await User.findOne({ username: username }).lean();
    if (!u) return null;
    
    u._id = u._id.toString();
    return u;
}

export const fetchpayments = async (username) => {
    await connectDb();
    
    // Now we can find payments directly using the username string!
    // We don't need to look up the ID first.
    let payments = await Payment.find({ to_user: username, done: true }) 
        .sort({ amount: -1 })
        .lean();

    return payments.map(p => {
        p._id = p._id.toString();
        // p.to_user is already a string now, so no need to convert it
        return p;
    });
}