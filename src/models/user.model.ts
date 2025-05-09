import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['ADMIN', 'PRINCIPAL', 'TEACHER', 'PARENT', 'STUDENT', 'RECEPTION', 'SECURITY'],
      required: true
    },
    profile_image: {
      type: String,
      required: false
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'School',
      required: true
    },
    verfication_otp:{
      type: String,
      required: false
    },
    otp_expiry_time:{
      type: Date,
      required: false
    },
    isVerified:{
      type: Boolean,
      default: false
    }

  },
  {
    timestamps: true,
    versionKey: false
  }
)
export const UserModel = mongoose.models.User || mongoose.model('User', UserSchema)
