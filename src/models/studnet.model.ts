import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      red: 'User',
      required: true
    },
    admission_number: {
      type: String,
      required: true
    },
    class_id: {
      type: mongoose.Schema.Types.ObjectId,
      red: 'Class',
      required: true
    },
    division: {
      type: String,
      required: true
    },
    dob: {
      type: Date,
      required: true
    },
    blood_group: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    guardian_name: {
      type: String,
      required: true
    },
    guardian_contact: {
      type: String,
      required: true
    },
    medical_history: {
      type: String,
      required: true
    },
    is_active: {
      type: Boolean,
      default: true
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'School',
      required: true
    }
  },
  { timestamps: true, versionKey: false }
)
export const studentModel = mongoose.models.Student || mongoose.model('Student', studentSchema)
