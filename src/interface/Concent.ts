import { CommonModal } from './CommonModel'
import { IEvent } from './Event'
import { IStudent } from './Student'
import { IUser } from './User'

export interface IConcent extends CommonModal {
  event_id: IEvent
  student_id: IStudent
  issued_by: IUser
  is_approved: boolean
}
