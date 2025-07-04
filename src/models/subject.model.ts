import mongoose from 'mongoose'

const subjectSchema = new mongoose.Schema(
  {
    class_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
      required: true
    },
    teacher_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
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
    },
    name:{
      type: String,
      required: true
    }
  },
  { timestamps: true, versionKey: false }
)
export const SubjectModel = mongoose.models.Subject || mongoose.model('Subject', subjectSchema)
