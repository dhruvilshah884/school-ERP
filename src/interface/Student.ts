import { IClass } from './Class'
import { CommonModal } from './CommonModel'
import { IUser } from './User'

export interface IStudent extends CommonModal {
  user_id: IUser
  admission_number: string
  class_id: IClass
  division: string
  dob: Date
  blood_group: string
  address: string
  guardian_name: string
  guardian_contact: string
  medical_history: string
  is_active: boolean
}
