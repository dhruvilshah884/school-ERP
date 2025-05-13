import mongoose from 'mongoose'

const gatePassSchema = new mongoose.Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'School'
    },
    issued_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reason: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    guardian_photo_url: {
      type: String,
      required: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true, versionKey: false }
)
export const GatePassModel = mongoose.models.gatePass || mongoose.model('gatePass', gatePassSchema)
