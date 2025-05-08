import { CommonModal } from './CommonModel'
import { IStudent } from './Student'
import { IUser } from './User'

export interface IParent extends CommonModal {
  user_id: IUser
  student_id: IStudent
}
