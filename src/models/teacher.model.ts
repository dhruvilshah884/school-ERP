import mongoose from 'mongoose'

const teacherSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    designation: {
      type: String,
      required: true
    },
    subject_specialization: {
      type: String,
      required: true
    },
    is_active: {
      type: Boolean,
      default: true,

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
export const teacherModel = mongoose.models.Teacher || mongoose.model('Teacher', teacherSchema)
