import { models } from '@/models'

export class attendanceService {
  private attendanceModel = models.Attendance
  public async createAttendace(data: any) {
    try {
      const attendance = await this.attendanceModel.create(data)
      return attendance
    } catch (error) {
      throw error
    }
  }
  public async getAttendanceByClass(classId: string) {
    try {
      const attendance = await this.attendanceModel.find({ class_id: classId })
      return attendance
    } catch (error) {
      throw error
    }
  }
  public async getAttendanceByStudent(studentId: string) {
    try {
      const attendance = await this.attendanceModel.find({ student_id: studentId })
      return attendance
    } catch (error) {
      throw error
    }
  }
}
