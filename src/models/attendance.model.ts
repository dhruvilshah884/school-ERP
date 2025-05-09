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
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
export const attendanceModel = mongoose.models.Attendance || mongoose.model('Attendance', attendaceSchema)
