import { IClass } from './Class'
import { CommonModal } from './CommonModel'
import { ISchool } from './School'
import { ISubject } from './Subject'

export interface ITimeTable extends CommonModal {
  class_id: IClass
  day_of_week: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY'
  subject_id: ISubject
  start_time: string
  end_time: string
  school:ISchool
}
