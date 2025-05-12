import { CommonModal } from './CommonModel'
import { IStudent } from './Student'
import { IUser } from './User'

export interface ILeave extends CommonModal {
  student_id: IStudent
  requested_by: IUser
  from_date: Date
  to_date: Date
  reason: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  attachment_url: string
}
