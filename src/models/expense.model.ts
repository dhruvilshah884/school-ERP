import mongoose from 'mongoose'

const expenseSchema = new mongoose.Schema(
  {
    faculty_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    title: {
      type: String,
      required: true
    },
    remarks: {
      type: String,
      required: false
    },
    amount: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED'],
      default: 'PENDING'
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'School'
    }
  },
  { timestamps: true, versionKey: false }
)
export const ExpensesModel = mongoose.models.Expense || mongoose.model('Expense', expenseSchema)
