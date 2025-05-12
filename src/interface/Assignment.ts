import { IClass } from './Class'
import { CommonModal } from './CommonModel'
import { ISchool } from './School'
import { ISubject } from './Subject'
import { ITeacher } from './Teacher'

export interface IAssignment extends CommonModal {
  school: ISchool
  class_id: IClass
  subject_id: ISubject
  teacher_id:ITeacher
  title: string
  description: string
  due_date: Date
  file_url: string
}
