import { IBus } from './Bus'
import { IClass } from './Class'
import { CommonModal } from './CommonModel'
import { IStudent } from './Student'

export interface IStudentTransportation extends CommonModal {
  bus: IBus
  student_id: IStudent
  class_id: IClass
  pickup_location: string
  dropoff_location: string
  pickup_time: string
  dropoff_time: string
}
