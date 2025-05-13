import { SchoolModel } from './school.model'
import { UserModel } from './user.model'
import { StudentModel } from './studnet.model'
import { ParentModel } from './parent.model'
import { TeacherModel } from './teacher.model'
import { ClassModel } from './class.model'
import { SubjectModel } from './subject.model'
import { TimeTableModel } from './timeTable.model'
import { AttendanceModel } from './attendance.model'
import { FacultAttendanceModel } from './facultAttendance.model'
import { ExamModel } from './exam.model'
import { MarksModel } from './marks.model'
import { FeeStructureModel } from './feeStructure.model'
import { FeePaymentModel } from './feePayment.model'
import { AssignmentModel } from './assignment.model'
import { LeaveModel } from './leave.model'
import { RecheckingModel } from './rechecking.model'
import { GatePassModel } from './gatePass.model'
import { NotificationModel } from './notification.model'
import { EventModel } from './event.model'
import { ConcentModel } from './concent.model'
import { FeedBackModel } from './feedBack.model'
import { StockModel } from './stock.model'
import { ExpensesModel } from './expense.model'
import { TaskModel } from './task.model'
import { DigitalIdModel } from './digitalId.model'
import { CertificateModel } from './certificates.model'

export const models = {
  School: SchoolModel,
  User: UserModel,
  Student: StudentModel,
  Parent: ParentModel,
  Teacher: TeacherModel,
  Class: ClassModel,
  Subject: SubjectModel,
  TimeTable: TimeTableModel,
  Attendance: AttendanceModel,
  FacultAttendance: FacultAttendanceModel,
  Exam: ExamModel,
  Marks: MarksModel,
  FeeStructure: FeeStructureModel,
  FeePayment: FeePaymentModel,
  Assignment: AssignmentModel,
  Leave: LeaveModel,
  Rechecking: RecheckingModel,
  GatePass: GatePassModel,
  Notification: NotificationModel,
  Event: EventModel,
  Concent: ConcentModel,
  FeedBack: FeedBackModel,
  Stock: StockModel,
  Expenses: ExpensesModel,
  Task: TaskModel,
  DigitalId: DigitalIdModel,
  Certificate: CertificateModel
}
