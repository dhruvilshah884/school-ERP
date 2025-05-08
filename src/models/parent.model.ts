import mongoose from 'mongoose'

const parentSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    }
  },
  { timestamps: true, versionKey: false }
)
export const parentModel = mongoose.models.Parent || mongoose.model('Parent', parentSchema)
