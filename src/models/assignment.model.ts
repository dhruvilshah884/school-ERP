import mongoose from 'mongoose'

const assignmentSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'School'
    },
    class_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class'
    },
    subject_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject'
    },
    teacher_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher'
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    due_date: {
      type: Date,
      required: true
    },
    file_url: {
      type: String,
      required: true
    }
  },
  { timestamps: true, versionKey: false }
)
export const assignmentModel = mongoose.models.Assignment || mongoose.model('Assignment', assignmentSchema)
