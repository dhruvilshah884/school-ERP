import { CommonModal } from './CommonModel'

export interface IBus extends CommonModal {
  busDriverName: string
  busDriverPhone: string
  busDriverLicense: string
  busNumber: string
  busType: string
  busCapacity: number
  busRoute: string
  busRouteDetails: string
  busRouteStart: string
  busRouteEnd: string
  busRouteStartTime: string
  busRouteEndTime: string
  busRouteDuration: string
  busRouteDistance: string
  busRouteStops: string[]
  busFees: number
}
