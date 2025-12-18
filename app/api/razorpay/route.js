// import { NextResponse } from "next/server";
// import Razorpay from "razorpay";
// import Payment from "@/models/Payment";
// import connectDb from "@/db/connectDb";
// import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";

// export const POST = async (req) => {
//     await connectDb();
//     let body = await req.formData()
//     body = Object.fromEntries(body)

//     let p = await Payment.findOne({oid: body.razorpay_order_id});
//     if(!p) {
//         return NextResponse.json({success: false, message: "Order Id not found"});
//     }

//     let xx = validatePaymentVerification({"order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id}, body.razorpay_signature, process.env.RAZORPAY_KEY_SECRET);

//     if(xx) {
//         const updatedPayment = await Payment.findOneAndUpdate({oid: body.razorpay_order_id},{done: true}, {new: true});
//         return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/payment/success?reference=${updatedPayment.oid}?paymentdone=true`);
//     } else {
//         return NextResponse.json({success: false, message: "Payment verification failed"});
//     }
// }


import { NextResponse } from "next/server";
import connectDb from "@/db/connectDb";
import Payment from "@/models/Payment";
import crypto from "crypto";

export async function POST(req) {
  try {
    await connectDb();

    // 1. Parse JSON (Don't use formData if frontend sends JSON)
    const body = await req.json();
    
    // Debug Log: Check if data is reaching here
    console.log("Verify Request Body:", body);

    // 2. Validate IDs exist
    if (!body.razorpay_order_id || !body.razorpay_payment_id || !body.razorpay_signature) {
        return NextResponse.json({ success: false, message: "Missing required Razorpay fields" });
    }

    // 3. Verify Signature Manually
    const secret = process.env.RAZORPAY_KEY_SECRET;
    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(body.razorpay_order_id + "|" + body.razorpay_payment_id)
      .digest("hex");

    console.log("Generated Sig:", generated_signature);
    console.log("Received Sig: ", body.razorpay_signature);

    if (generated_signature === body.razorpay_signature) {
      
      // 4. Update Database (Set done: true)
      const updatedPayment = await Payment.findOneAndUpdate(
        { oid: body.razorpay_order_id },
        { done: true }, 
        { new: true }
      );

      if (!updatedPayment) {
        console.error("Payment verified but Order ID not found in DB:", body.razorpay_order_id);
        return NextResponse.json({ success: false, message: "Order ID not found in database" });
      }

      console.log("Database Updated Successfully:", updatedPayment);
      
      // 5. Redirect User
      // Note: Redirects in API routes called by fetch() don't automatically redirect the browser.
      // It's better to return success and let frontend redirect.
      return NextResponse.json({ success: true, message: "Payment Verified" });
    
    } else {
      console.error("Signature Mismatch!");
      return NextResponse.json({ success: false, message: "Invalid Signature" });
    }

  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" });
  }
}