import { CommonModal } from './CommonModel'
import { ISchool } from './School'

export interface IUser extends CommonModal {
  name: string
  email: string
  password: string
  phone: string
  gender: string
  role: 'ADMIN' | 'PRINCIPAL' | 'TEACHER' | 'PARENT' | 'STUDENT' | 'RECEPTION' | 'SECURITY'
  profile_image?: string
  school: ISchool
  verfication_otp?: string
  otp_expiry_time?: Date
  isVerified?: boolean
}
