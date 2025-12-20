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
        return p;
    });
}


export const updateProfile = async (data, oldusername) => {
    await connectDb();
    let ndata = Object.fromEntries(data);

    if (oldusername !== ndata.username) {
        
        let u = await User.findOne({ username: ndata.username });
        if (u) {
            return { error: "Username already taken" };
        }

        // This finds every payment where 'to_user' was the old name 
        // and updates it to the new name.
        await Payment.updateMany(
            { to_user: oldusername }, // Find payments sent to old username
            { to_user: ndata.username } // Update them to new username
        );
    }

    // Finally, update the User profile itself
    await User.updateOne({ email: ndata.email }, ndata);
    
    return { success: true };
}


export const fetchAllCreators = async () => {
    await connectDb();
    // Fetch 6 users who have a username set
    const users = await User.find({ username: { $exists: true, $ne: null } }).limit(6).lean();
    
    // Convert _id objects to strings so they can pass to the Client Component
    return users.map(user => ({
        ...user,
        _id: user._id.toString(),
    }));
}