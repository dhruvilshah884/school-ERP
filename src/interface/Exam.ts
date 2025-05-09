import { IClass } from './Class'
import { CommonModal } from './CommonModel'

export interface IExam extends CommonModal {
  name: string
  class_id: IClass
  date: Date
  type: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'HALFYEARLY' | 'YEARLY' | 'BOARD' | 'OTHER'
}
