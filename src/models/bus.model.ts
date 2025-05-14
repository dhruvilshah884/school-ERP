import mongoose from 'mongoose'

const busSchema = new mongoose.Schema(
  {
    busDriverName: {
      type: String,
      required: true
    },
    busDriverPhone: {
      type: String,
      required: true
    },
    busDriverLicense: {
      type: String,
      required: true
    },
    busNumber: {
      type: String,
      required: true
    },
    busType: {
      type: String,
      required: true
    },
    busCapacity: {
      type: Number,
      required: true
    },
    busRoute: {
      type: String,
      required: true
    },
    busRouteDetails: {
      type: String,
      required: true
    },
    busRouteStart: {
      type: String,
      required: true
    },
    busRouteEnd: {
      type: String,
      required: true
    },
    busRouteStartTime: {
      type: String,
      required: true
    },
    busRouteEndTime: {
      type: String,
      required: true
    },
    busRouteDuration: {
      type: String,
      required: true
    },
    busRouteDistance: {
      type: String,
      required: true
    },
    busRouteStops: {
      type: [String],
      required: true
    },
    busFees: {
      type: Number,
      required: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'School',
      required: true
    }
  },
  {
    timestamps: true
  }
)
export const BusModel = mongoose.models.Bus || mongoose.model('Bus', busSchema)
