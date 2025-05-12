import { CommonModal } from './CommonModel'
import { IFeeStructure } from './FeeStructure'
import { ISchool } from './School'
import { IStudent } from './Student'

export interface IFeePayment extends CommonModal {
  school: ISchool
  student_id: IStudent
  structure_id: IFeeStructure
  amount_paid: number
  payment_date: Date
  payment_method: 'CASH' | 'CHEQUE' | 'ONLINE' | 'CARD' | 'TRANSFER' | 'OTHER'
  transaction_id?: string
}
