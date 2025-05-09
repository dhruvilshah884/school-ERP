import { CommonModal } from './CommonModel'
import { ITeacher } from './Teacher'

export interface IFacultAttendance extends CommonModal {
  teacher_id: ITeacher
  date: Date
  method: 'BIOMETRIC' | 'QR' | 'FACE' | 'PIN' | 'CARD'
  status: 'PRESENT' | 'ABSENT' | 'LEAVE'
}
