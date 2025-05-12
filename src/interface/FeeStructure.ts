import { IClass } from './Class'
import { CommonModal } from './CommonModel'
import { ISchool } from './School'

export interface IFeeStructure extends CommonModal {
  school: ISchool
  class_id: IClass
  term: 'TERM 1' | 'TERM 2' | 'TERM 3'
  amount: number
  due_date: Date
}
