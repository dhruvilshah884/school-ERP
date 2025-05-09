import { models } from '@/models'

export class facultyAttendance {
  private facultyAttendanceModel = models.FacultAttendance
  public async createFacultyAttendance(data: any) {
    try {
      const facultyAttendance = await this.facultyAttendanceModel.create(data)
      return facultyAttendance
    } catch (error) {
      throw error
    }
  }
  public async getFacultAttendance(facultyId: string) {
    try {
      const facultyAttendance = await this.facultyAttendanceModel.find({ _id: facultyId }).populate('teacher_id')
      return facultyAttendance
    } catch (error) {
      throw error
    }
  }
  public async updateFacultyAttendance(facultyId: string, data: any) {
    try {
      const facultyAttendance = await this.facultyAttendanceModel.updateOne({ _id: facultyId }, { $set: data })
      return facultyAttendance
    } catch (error) {
      throw error
    }
  }
  public async deleteFacultyAttendance(facultyId: string) {
    try {
      const facultyAttendance = await this.facultyAttendanceModel.updateMany({ _id: facultyId }, { $set: { isDeleted: true } })
      return facultyAttendance
    } catch (error) {
      throw error
    }
  }
}
