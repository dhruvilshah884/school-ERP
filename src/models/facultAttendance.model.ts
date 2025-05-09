import mongoose from 'mongoose'

const facultAttendanceSchema = new mongoose.Schema(
  {
    teacher_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'teacher',
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    method: {
      type: String,
      enum: ['BIOMETRIC', 'QR', 'FACE', 'PIN', 'CARD'],
      required: true
    },
    status: {
      type: String,
      enum: ['PRESENT', 'ABSENT', 'LEAVE'],
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
export const facultAttendanceModel =
  mongoose.models.facultAttendance || mongoose.model('facultAttendance', facultAttendanceSchema)
