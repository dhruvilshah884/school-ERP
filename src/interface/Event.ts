import { CommonModal } from './CommonModel'
import { IUser } from './User'

export interface IEvent extends CommonModal {
  title: string
  description: string
  date: Date
  location: string
  requires_consent: boolean
  created_by: IUser
}
