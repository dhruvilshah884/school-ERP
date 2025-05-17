import { models } from '@/models'

export class teacherService {
  private teacherModel = models.Teacher
  public async createTeacher(teacher: any) {
    const newTeacher = await this.teacherModel.create(teacher)
    return newTeacher
  }
  public async getTeacher(school:string) {
    const teacher = await this.teacherModel.find({ isDeleted: false , school:school }).populate('user_id').populate('school')
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
  public async getAllTeacherDetails(id:string):Promise<any> {
    const teacher = await this.teacherModel.findById(id).populate('user_id').populate('school')
    const subject = await models.Subject.find({ teacher_id: id }).populate('class_id').populate('school')
    const facultAttendance = await models.FacultAttendance.find({ teacher_id: id }).populate('school')
    const assignment = await models.Assignment.find({ teacher_id: id }).populate('class_id').populate('subject_id').populate('school')
    return {
      teacher,
      subject,
      facultAttendance, 
      assignment
      }
      
  }
}
