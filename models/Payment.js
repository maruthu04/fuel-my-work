import mongoose from "mongoose";
const { Schema, model } = mongoose;

const PaymentSchema = new Schema({
    name: {type: String, required: true},
    to_user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    oid: {type: String, required: true, unique: true},
    amount: {type: Number, required: true},
    done: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
});

export default mongoose.models.Payment || model("Payment", PaymentSchema);