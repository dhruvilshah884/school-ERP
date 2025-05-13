import mongoose from 'mongoose'

const certificateSchema = new mongoose.Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    },
    certificate_type: {
      type: String,
      required: true
    },
    certificate_number: {
      type: String,
      required: true
    },
    date_issued: {
      type: Date,
      required: true
    },
    date_expired: {
      type: Date,
      required: true
    },
    certificate_url: {
      type: String,
      required: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'School'
    }
  },
  { timestamps: true, versionKey: false }
)
export const CertificateModel = mongoose.models.Certificate || mongoose.model('Certificate', certificateSchema)
