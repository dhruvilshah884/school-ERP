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
  Exam: examModel
}
