import mongoose from 'mongoose'

const recheckinhSchema = new mongoose.Schema(
  {
    requested_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'School'
    },
    exam_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exam'
    },
    subject_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject'
    },
    is_approved: {
      type: Boolean,
      default: false
    },
    transaction_id: {
      type: String,
      required: true
    },
    approved_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
export const recheckingModel = mongoose.models.Rechecking || mongoose.model('Rechecking', recheckinhSchema)
