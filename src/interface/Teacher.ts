import { CommonModal } from './CommonModel'
import { IUser } from './User'

export interface ITeacher extends CommonModal {
  user_id: IUser
  designation: string
  subject_specialization: string
  is_active: boolean
}
