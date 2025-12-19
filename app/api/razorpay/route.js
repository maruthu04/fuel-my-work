// import { NextResponse } from "next/server";
// import connectDb from "@/db/connectDb";
// import Payment from "@/models/Payment";
// import User from "@/models/User"; // 1. Import User model
// import crypto from "crypto";

// export async function POST(req) {
//   try {
//     await connectDb();

//     // Parse Body
//     const body = await req.json();

//     // Check for required fields
//     if (!body.razorpay_order_id || !body.razorpay_payment_id || !body.razorpay_signature) {
//         return NextResponse.json({ success: false, message: "Missing required Razorpay fields" });
//     }

//     // ---------------------------------------------------------
//     // STEP 1: Find the Payment Order first
//     // We need this to know WHO the payment is for (the username)
//     // ---------------------------------------------------------
//     const payment = await Payment.findOne({ oid: body.razorpay_order_id });
    
//     if (!payment) {
//         return NextResponse.json({ success: false, message: "Order ID not found in database" });
//     }

//     // ---------------------------------------------------------
//     // STEP 2: Fetch the User (Recipient) to get their Secret
//     // Assuming your Payment model stores the recipient username in 'to_user'
//     // ---------------------------------------------------------
//     const user = await User.findOne({ username: payment.to_user });

//     if (!user || !user.razorpaySecret) {
//         return NextResponse.json({ success: false, message: "Recipient user or secret key not found" });
//     }

//     const secret = user.razorpaySecret; // Use the dynamic secret from DB

//     // ---------------------------------------------------------
//     // STEP 3: Verify Signature using the User's Secret
//     // ---------------------------------------------------------
//     const generated_signature = crypto
//       .createHmac("sha256", secret)
//       .update(body.razorpay_order_id + "|" + body.razorpay_payment_id)
//       .digest("hex");

//     console.log("Generated Sig:", generated_signature);
//     console.log("Received Sig: ", body.razorpay_signature);

//     if (generated_signature === body.razorpay_signature) {
      
//       // 4. Update Payment Status to done
//       payment.done = true;
//       await payment.save();

//       return NextResponse.json({ success: true, message: "Payment Verified" });
    
//     } else {
//       console.error("Signature Mismatch!");
//       return NextResponse.json({ success: false, message: "Invalid Signature" });
//     }

//   } catch (error) {
//     console.error("Verification Error:", error);
//     return NextResponse.json({ success: false, message: "Internal Server Error" });
//   }
// }


import { NextResponse } from "next/server";
import connectDb from "@/db/connectDb";
import Payment from "@/models/Payment";
import User from "@/models/User"; 
import crypto from "crypto";

export async function POST(req) {
  try {
    await connectDb();

    // 1. Parse Data
    const body = await req.json();
    console.log("🔹 1. Received Body:", body);

    // 2. Find the Pending Payment Order
    // We look for the order ID to identify who this payment is for
    const payment = await Payment.findOne({ oid: body.razorpay_order_id });
    
    if (!payment) {
        console.log("❌ Payment Order Not Found in DB:", body.razorpay_order_id);
        return NextResponse.json({ success: false, message: "Order ID not found" });
    }
    console.log("🔹 2. Found Payment in DB:", payment);

    // 3. Find the Recipient User to get THEIR Secret Key
    // Make sure your Payment model saves the username in 'to_user' or 'recipient'
    // Adjust 'payment.to_user' below if you named it differently
    const user = await User.findOne({ username: payment.to_user });

    if (!user) {
        console.log("❌ Recipient User Not Found:", payment.to_user);
        return NextResponse.json({ success: false, message: "User not found" });
    }
    console.log("🔹 3. Found User:", user.username);

    if (!user.razorpaysecret) {
        console.log("❌ Secret Key Missing for User:", user.username);
        return NextResponse.json({ success: false, message: "Secret key not set" });
    }

    // 4. Verify Signature
    const secret = user.razorpaysecret;
    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(body.razorpay_order_id + "|" + body.razorpay_payment_id)
      .digest("hex");

    console.log("🔸 Generated Signature:", generated_signature);
    console.log("🔸 Received Signature: ", body.razorpay_signature);

    if (generated_signature === body.razorpay_signature) {
      console.log("✅ Signature Matched! Payment Verified.");
      
      // Update Payment Status
      payment.done = true;
      await payment.save();

      return NextResponse.json({ success: true, message: "Payment Verified" });
    } else {
      console.log("❌ Signature Mismatch! Check if Razorpay ID and Secret belong to the same pair.");
      return NextResponse.json({ success: false, message: "Invalid Signature" });
    }

  } catch (error) {
    console.error("❌ Verification Error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" });
  }
}