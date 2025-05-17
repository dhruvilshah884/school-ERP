import mongoose from 'mongoose'

const studentTransportationSchema = new mongoose.Schema(
  {
    bus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bus',
      required: true
    },
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    class_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
      required: true
    },
    pickup_location: {
      type: String,
      required: true
    },
    dropoff_location: {
      type: String,
      required: true
    },
    pickup_time: {
      type: String,
      required: true
    },
    dropoff_time: {
      type: String,
      required: true
    },
    payment_status: {
      type: String,
      enum: ['paid', 'unpaid'],
      default: 'unpaid'
    },
    transportation_id: {
      type: String,
      required: false
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'School',
      required: true
    }
  },
  {
    timestamps: true
  }
)
export const StudentTransportationModel =
  mongoose.models.StudentTransportation || mongoose.model('StudentTransportation', studentTransportationSchema)
