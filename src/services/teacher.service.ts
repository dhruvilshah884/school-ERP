import { models } from '@/models'

export class teacherService {
  private teacherModel = models.Teacher
  public async createTeacher(teacher: any) {
    const newTeacher = await this.teacherModel.create(teacher)
    return newTeacher
  }
  public async getTeacher() {
    const teacher = await this.teacherModel.find({ isDeleted: false }).populate('user_id').populate('school')
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
}
