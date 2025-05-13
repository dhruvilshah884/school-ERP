import { CommonModal } from './CommonModel'
import { ISchool } from './School'
import { IStudent } from './Student'

export interface IDigitalId extends CommonModal {
  student_id: IStudent
  qr_code: string
  status: 'ACTIVE' | 'INACTIVE'
  date_assigned: Date
  school:ISchool
}
