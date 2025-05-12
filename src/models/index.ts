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
  Leave: leaveModel
}
