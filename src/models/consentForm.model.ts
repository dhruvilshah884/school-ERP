import mongoose from 'mongoose'

const consentSchema = new mongoose.Schema({
  parent_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  },
  status: {
    type: String,
    enum: ['GIVEN', 'NOT_GIVENT'],
    default: 'NOT_GIVENT'
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
})
export const ConsentForm = mongoose.models.ConsentForm || mongoose.model('ConsentForm', consentSchema)
