import { CommonModal } from './CommonModel'
import { ISchool } from './School'
import { IStudent } from './Student'
import { IUser } from './User'

export interface IParent extends CommonModal {
  user_id: IUser
  student_id: IStudent
  relation: 'FATHER' | 'MOTHER' | 'GUARDIAN'
  occupation: string
  income: number
  school:ISchool
}
