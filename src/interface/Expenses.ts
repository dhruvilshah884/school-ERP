import { CommonModal } from './CommonModel'
import { IUser } from './User'

export interface IExpenses extends CommonModal {
  faculty_id: IUser
  title: string
  amount: number
  date: Date
  remarks: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
}
