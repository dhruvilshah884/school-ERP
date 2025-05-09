import { CommonModal } from './CommonModel'
import { ISchool } from './School'
import { ITeacher } from './Teacher'

export interface IFacultAttendance extends CommonModal {
  teacher_id: ITeacher
  date: Date
  method: 'BIOMETRIC' | 'QR' | 'FACE' | 'PIN' | 'CARD'
  status: 'PRESENT' | 'ABSENT' | 'LEAVE'
  school:ISchool
}
