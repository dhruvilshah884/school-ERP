import { CommonModal } from './CommonModel'
import { IStudent } from './Student'
import { IUser } from './User'

export interface IGatePass extends CommonModal {
  student_id: IStudent
  issued_by: IUser
  reason: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  guardian_photo_url: string
}
