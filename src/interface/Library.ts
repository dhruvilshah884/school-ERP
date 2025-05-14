import { CommonModal } from './CommonModel'
import { ISchool } from './School'
import { IStudent } from './Student'

export interface ILibrary extends CommonModal {
  school: ISchool
  student_id: IStudent
  bookName: string
  bookAuthorName?: string
  libraryName: string
  date: Date
  dueDate: Date
  returnDate?: Date
  fineAmount?: number
  status?: 'issued' | 'returned' | 'overdue' | 'lost'
  remarks?: string
}
