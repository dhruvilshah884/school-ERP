import { SchoolModel } from './school.model'
import { UserModel } from './user.model'
import { studentModel } from './studnet.model'
import { parentModel } from './parent.model'
import { teacherModel } from './teacher.model'
import { classModel } from './class.model'
import { subjectModel } from './subject.model'
import { timeTableModel } from './timeTable.model'
import { attendanceModel } from './attendance.model'
import { facultAttendanceModel } from './facultAttendance.model'
import { examModel } from './exam.model'
import { marksModel } from './marks.model'
import { feeStructureModel } from './feeStructure.model'
import { feePaymentModel } from './feePayment.model'
import { assignmentModel } from './assignment.model'
import { leaveModel } from './leave.model'
import { recheckingModel } from './rechecking.model'
import { gatePass } from './gatePass.model'
import { Notification } from './notification.model'
import { Event } from './event.model'
import { Concent } from './concent.model'
import { ConsentForm } from './consentForm.model'
import { FeedBack } from './feedBack.model'

export const models = {
  School: SchoolModel,
  User: UserModel,
  Student: studentModel,
  Parent: parentModel,
  Teacher: teacherModel,
  Class: classModel,
  Subject: subjectModel,
  TimeTable: timeTableModel,
  Attendance: attendanceModel,
  FacultAttendance: facultAttendanceModel,
  Exam: examModel,
  Marks: marksModel,
  FeeStructure: feeStructureModel,
  FeePayment: feePaymentModel,
  Assignment: assignmentModel,
  Leave: leaveModel,
  Rechecking: recheckingModel,
  GatePass: gatePass,
  Notification: Notification,
  Event: Event,
  Concent: Concent,
  ConsentForm: ConsentForm,
  FeedBack: FeedBack
}
