import { CommonModal } from './CommonModel'
import { IUser } from './User'

export interface IFeedBack extends CommonModal {
  name: string
  purpose: string
  feedback: string
  visit_date: Date
  recorded_by: IUser
}
