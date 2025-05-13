import mongoose from 'mongoose'

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    acadamic_year: {
      type: String
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
export const ClassModel = mongoose.models.Class || mongoose.model('Class', classSchema)
