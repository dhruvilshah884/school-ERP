import { models } from '@/models'

export class AssignmentService {
  public async uploadAssignment(data: any) {
    return await models.Assignment.create(data)
  }
  public async getAssignment(id: string) {
    return await models.Assignment.findById(id)
      .populate('school')
      .populate('class_id')
      .populate('subject_id')
      .populate('teacher_id')
  }
  public async getAssignments(schoolId: string) {
    const assignment = await models.Assignment.find({ isDeleted: false, school: schoolId })
      .populate('school')
      .populate('class_id')
      .populate('subject_id')
      .populate('teacher_id')
    return assignment
  }
  public async updateAssignment(id: string, data: any) {
    return await models.Assignment.findByIdAndUpdate(id, data)
  }
  public async deleteAssignment(id: string) {
    return await models.Assignment.findByIdAndUpdate(id, { isDeleted: true })
  }
}
