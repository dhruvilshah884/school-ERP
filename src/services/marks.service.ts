import { models } from '@/models'

export class MarkService {
  public async createMarks(data: any): Promise<any> {
    const mark = await models.Marks.create(data)
    return mark
  }
  public async getMarks(): Promise<any> {
    const marks = await models.Marks.find({ isDeleted: false })
      .populate('student_id')
      .populate('subject_id')
      .populate('entered_by')
      .populate('exam_id')
    return marks
  }
  public async getMarksByStudentId(studentId: any): Promise<any> {
    const marks = await models.Marks.find({ student_id: studentId })
      .populate('student_id')
      .populate('subject_id')
      .populate('entered_by')
      .populate('exam_id')
    return marks
  }
  public async updateMarks(id: any, data: any): Promise<any> {
    const mark = await models.Marks.findByIdAndUpdate(id, data)
    return mark
  }
  public async deleteMarks(id: any): Promise<any> {
    const mark = await models.Marks.findByIdAndUpdate(id, { isDeleted: true })
    return mark
  }
}
