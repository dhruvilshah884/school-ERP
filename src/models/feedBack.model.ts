import mongoose from 'mongoose'

const feedBackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  purpose: {
    type: String,
    required: true
  },
  feedback: {
    type: String,
    required: true
  },
  visit_date: {
    type: Date,
    default: Date.now()
  },
  recorded_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
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
})
export const FeedBackModel = mongoose.models.FeedBack || mongoose.model('FeedBack', feedBackSchema)
