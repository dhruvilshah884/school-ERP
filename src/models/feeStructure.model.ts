import mongoose from "mongoose";

const feeStructureSchema = new mongoose.Schema({
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School'
    },
    class_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    },
    term: {
        type: String,
        enum: ['TERM 1', 'TERM 2', 'TERM 3'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    due_date: {
        type: Date,
        required: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
}, { timestamps: true , versionKey: false })
export const feeStructureModel = mongoose.models.FeeStructure || mongoose.model('FeeStructure', feeStructureSchema)