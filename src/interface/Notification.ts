import { CommonModal } from './CommonModel'
import { IUser } from './User'

export interface INotification extends CommonModal {
  title: string
  content: string
  target_role: 'ALL' | 'STUDENT' | 'TEACHER' | 'PARENT'
  issued_by: IUser
}
