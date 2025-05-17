import mongoose from 'mongoose'

const digitalIdSchema = new mongoose.Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    qr_code: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      default: 'ACTIVE'
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    date_assigned: {
      type: Date,
      default: Date.now()
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'School'
    }
  },
  { timestamps: true, versionKey: false }
)
export const DigitalIdModel = mongoose.models.DigitalId || mongoose.model('DigitalId', digitalIdSchema)
