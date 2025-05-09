import mongoose from 'mongoose'

const timeTableSchema = new mongoose.Schema(
  {
    class_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
      required: true
    },
    day_of_week: {
      type: String,
      enum: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'],
      required: true
    },
    subject_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
      required: true
    },
    start_time: {
      type: Date,
      required: true
    },
    end_time: {
      type: Date,
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
export const timeTableModel = mongoose.models.TimeTable || mongoose.model('TimeTable', timeTableSchema)
