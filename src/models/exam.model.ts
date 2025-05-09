import mongoose from 'mongoose'

const examSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    class_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'class',
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
    }
  },
  { timestamps: true, versionKey: false }
)

export const examModel = mongoose.models.Exam || mongoose.model('Exam', examSchema)
