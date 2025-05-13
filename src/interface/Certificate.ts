import { CommonModal } from './CommonModel'
import { IStudent } from './Student'

export interface ICertificate extends CommonModal {
  student_id: IStudent
  certificate_type: string
  certificate_number: string
  date_issued: Date
  date_expired: Date
  certificate_url: string
}
