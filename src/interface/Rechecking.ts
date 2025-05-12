import { CommonModal } from './CommonModel'
import { IExam } from './Exam'
import { ISchool } from './School'
import { ISubject } from './Subject'
import { IUser } from './User'

export interface IRechecking extends CommonModal {
  requested_by: IUser
  school: ISchool
  exam_id: IExam
  subject_id: ISubject
  is_approved: boolean
  transaction_id: string
  approved_by?: IUser
}
