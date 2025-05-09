import mongoose from 'mongoose'

const SchoolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    logo: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
export const SchoolModel = mongoose.models.School || mongoose.model('School', SchoolSchema)
