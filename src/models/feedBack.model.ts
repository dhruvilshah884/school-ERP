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
  }
})
export const FeedBack = mongoose.models.FeedBack || mongoose.model('FeedBack', feedBackSchema)
