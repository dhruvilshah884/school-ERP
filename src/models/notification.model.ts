import mongoose from 'mongoose'
const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  target_role: {
    type: String,
    enum: ['STUDENT', 'TEACHER', 'PARENT', 'ADMIN', 'ALL']
  },
  read: {
    type: Boolean,
    default: false
  },
  issued_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})
export const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema)
