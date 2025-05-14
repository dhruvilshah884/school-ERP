import { models } from '@/models'

export class RecheckingService {
  public async createRechecking(data: any) {
    return await models.Rechecking.create(data)
  }

  public async approvedByTeacher(id: string, data: any) {
    return await models.Rechecking.findByIdAndUpdate(id, data, { new: true })
  }

  public async getRecheckingByStudentId(studentId: string) {
   const rechecking = await models.Rechecking.find({ requested_by: studentId }).populate('exam_id').populate('subject_id').populate('school').populate('approved_by').populate('requested_by')
   return rechecking
  }
  public async getRechecking(school:string) {
    return await models.Rechecking.find({isDeleted:false , school:school})
      .populate('exam_id')
      .populate('subject_id')
      .populate('school')
      .populate('approved_by')
      .populate('requested_by')
  }
}
