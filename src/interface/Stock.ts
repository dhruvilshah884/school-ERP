import { CommonModal } from './CommonModel'
import { ISchool } from './School'
import { IUser } from './User'
export interface IStock extends CommonModal {
  name: string
  quantity: number
  assigned_to: IUser
  date_assigned: Date
  status: 'WORKING' | 'BROKEN' | 'REPAIRED' | 'DISCARDED'
  school:ISchool
}
