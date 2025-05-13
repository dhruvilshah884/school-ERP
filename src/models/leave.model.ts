import mongoose from 'mongoose'

const leaveSchema = new mongoose.Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    },
    class_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class'
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'School'
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
    approved_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rejected_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    attachment_url: {
      type: String,
      required: false
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { timeStamps: true, versionKey: false }
)
export const leaveModel = mongoose.models.Leave || mongoose.model('Leave', leaveSchema)
