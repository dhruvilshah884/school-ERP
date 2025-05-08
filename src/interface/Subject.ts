import { IClass } from './Class'
import { CommonModal } from './CommonModel'
import { ITeacher } from './Teacher'

export interface ISubject extends CommonModal {
  name: string
  class_id: IClass
  teacher_id: ITeacher
}
