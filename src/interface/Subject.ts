import { IClass } from './Class'
import { CommonModal } from './CommonModel'
import { ISchool } from './School'
import { ITeacher } from './Teacher'

export interface ISubject extends CommonModal {
  name: string
  class_id: IClass
  teacher_id: ITeacher
  school:ISchool
}
