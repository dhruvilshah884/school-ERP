import { models } from '@/models'
import { Types } from 'mongoose'

export class teacherService {
  private teacherModel = models.Teacher
  public async createTeacher(teacher: any) {
    const newTeacher = await this.teacherModel.create(teacher)
    return newTeacher
  }
  public async getTeacher(school: string) {
    const teacher = await this.teacherModel
      .find({ isDeleted: false, school: school })
      .populate('user_id')
      .populate('school')
    return teacher
  }
  public async getTeacherById(id: any) {
    const teacher = await this.teacherModel.findById(id).populate('user_id').populate('school')
    return teacher
  }
  public async updateTeacher(id: any, teacher: any) {
    const updateTeacher = await this.teacherModel.findByIdAndUpdate(id, teacher, { new: true })
    return updateTeacher
  }
  public async deleteTeacher(id: any) {
    const deleteTeacher = await this.teacherModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
    return deleteTeacher
  }
  public async getAllTeacherDetails(id: string): Promise<any> {
    const teacher = await this.teacherModel.findById(id).populate('user_id').populate('school')
    const subject = await models.Subject.find({ teacher_id: id }).populate('class_id').populate('school')
    const assignment = await models.Assignment.find({ teacher_id: id })
      .populate('class_id')
      .populate('subject_id')
      .populate('school')
    const attendanceStats = await models.FacultAttendance.aggregate([
      { $match: { teacher_id: new Types.ObjectId(id), isDeleted: false } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ])

    let present_days = 0
    let absent_days = 0
    let total_days = 0

    for (const row of attendanceStats) {
      if (row._id === 'PRESENT') present_days = row.count
      if (row._id === 'ABSENT') absent_days = row.count
      total_days += row.count
    }

    const attendance_percentage = total_days === 0 ? 0 : (present_days / total_days) * 100

    const faculty = await models.FacultAttendance.find({ teacher_id: id, isDeleted: false })
    return {
      teacher,
      subject,
      assignment,
      facultAttendance: {
        present_days,
        absent_days,
        attendance_percentage: Number(attendance_percentage.toFixed(2)),
        attendanceStats,
        faculty
      }
    }
  }
}
