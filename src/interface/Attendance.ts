import { CommonModal } from './CommonModel'
import { ISchool } from './School'
import { IStudent } from './Student'
import { ITeacher } from './Teacher'

export interface IAttendance extends CommonModal {
  student_id: IStudent
  date: Date
  status: 'PRESENT' | 'ABSENT' | 'LEAVE'
  marked_by: ITeacher
  school:ISchool
}
