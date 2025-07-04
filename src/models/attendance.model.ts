import mongoose from 'mongoose'

const attendaceSchema = new mongoose.Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['PRESENT', 'ABSENT', 'LEAVE'],
      required: true
    },
    marked_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
      required: true
    },
    class_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
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
  {
    timestamps: true,
    versionKey: false
  }
)
export const AttendanceModel = mongoose.models.Attendance || mongoose.model('Attendance', attendaceSchema)
