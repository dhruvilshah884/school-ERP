import { models } from '@/models'

export class TaskService {
  public async create(data: any) {
    return await models.Task.create(data)
  }
  public async findAll(schoolId: string) {
    return await models.Task.find({ isDeleted: false, school: schoolId })
      .populate('assigned_to')
      .populate('assigned_by')
      .populate('school')
  }
  public async findOne(id: string) {
    return await models.Task.findById(id)
  }
  public async update(id: string, data: any) {
    return await models.Task.findByIdAndUpdate(id, data, { new: true })
  }
  public async delete(id: string) {
    return await models.Task.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
  }
  public async getTaskByFaculty(facultyId: string) {
    return await models.Task.find({ assigned_to: facultyId, isDeleted: false })
      .populate('assigned_to')
      .populate('assigned_by')
      .populate('school')
  }
}
