import { CommonModal } from './CommonModel'
import { IExam } from './Exam'
import { ISchool } from './School'
import { IStudent } from './Student'
import { ISubject } from './Subject'
import { ITeacher } from './Teacher'

export interface IMarks extends CommonModal {
  student_id: IStudent
  school: ISchool
  exam_id: IExam
  subject_id: ISubject
  marks_obtained: number
  max_marks: number
  entered_by: ITeacher
  is_locked: boolean
}
