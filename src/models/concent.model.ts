import mongoose from 'mongoose'

const concentSchema = new mongoose.Schema(
  {
    event_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true
    },
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    issued_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    is_approved: {
      type: Boolean,
      default: false
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'School'
    },
  },
  { timestamps: true, versionKey: false }
)
export const ConcentModel = mongoose.models.Concent || mongoose.model('Concent', concentSchema)
