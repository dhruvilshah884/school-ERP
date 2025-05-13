import mongoose from "mongoose";

const feePaymentSchema = new mongoose.Schema({
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School'
    },
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    structure_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FeeStructure'
    },
    amount_paid: {
        type: Number,
        required: true
    },
    payment_date: {
        type: Date,
        required: true
    },
    payment_method: {
        type: String,
        enum: ['CASH', 'CHEQUE', 'ONLINE', 'CARD', 'TRANSFER', 'OTHER'],
        required: true
    },
    transaction_id: {
        type: String
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
}, { timestamps: true , versionKey: false })
export const FeePaymentModel = mongoose.models.FeePayment || mongoose.model('FeePayment', feePaymentSchema)