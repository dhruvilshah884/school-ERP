import mongoose from 'mongoose'

const examSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    class_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    type: {
      type: String,
      enum: ['DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'HALFYEARLY', 'YEARLY', 'BOARD', 'OTHER'],
      required: true
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'School',
      required: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true, versionKey: false }
)

export const ExamModel = mongoose.models.Exam || mongoose.model('Exam', examSchema)
