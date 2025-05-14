import mongoose from 'mongoose'

const librarySchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'School',
      required: true
    },
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    bookName: {
      type: String,
      required: true
    },
    libraryName: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    dueDate: {
      type: Date,
      required: true
    },
    returnDate: {
      type: Date
    },
    fineAmount: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['issued', 'returned', 'overdue', 'lost'],
      default: 'issued'
    },
    remarks: {
      type: String
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true, versionKey: false }
)
export const LibraryModel = mongoose.models.Library || mongoose.model('Library', librarySchema)
