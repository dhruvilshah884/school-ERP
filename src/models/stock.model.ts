import mongoose from 'mongoose'

const stockSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  assigned_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  date_assigned: {
    type: Date,
    default: Date.now()
  },
  status: {
    type: String,
    enum: ['WORKING', 'BROKEN', 'REPAIRED', 'DISCARDED']
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School'
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
},{timestamps: true , versionKey: false})
export const StockModel = mongoose.models.Stock || mongoose.model('Stock', stockSchema)
