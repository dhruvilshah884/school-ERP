import mongoose from 'mongoose'

const leaveSchema = new mongoose.Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    },
    requested_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    from_date: {
      type: Date,
      required: true
    },
    to_date: {
      type: Date,
      required: true
    },
    reason: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED'],
      default: 'PENDING'
    },
    attachment_url: {
      type: String,
      required: false
    }
  },
  { timeStamps: true, versionKey: false }
)
export const leaveModel = mongoose.models.Leave || mongoose.model('Leave', leaveSchema)
