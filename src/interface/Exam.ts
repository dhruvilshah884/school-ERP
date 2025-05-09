import { IClass } from './Class'
import { CommonModal } from './CommonModel'
import { ISchool } from './School'

export interface IExam extends CommonModal {
  name: string
  class_id: IClass
  date: Date
  type: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'HALFYEARLY' | 'YEARLY' | 'BOARD' | 'OTHER'
  school:ISchool
}
