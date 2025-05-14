import {models} from '@/models'
export class examService {
  private examModel = models.Exam
  public async createExam(data: any) {
    try {
      const exam = await this.examModel.create(data)
      return exam
    } catch (error) {
      throw error
    }
  }
  public async getExamById(id: string) {
    try {
      const exam = await this.examModel.findById(id).populate('class_id').populate('school')
      return exam
    } catch (error) {
      throw error
    }
  }
  public async getExamsByClass(classId: string) {
    try {
      const exams = await this.examModel.find({ class_id: classId }).populate('class_id').populate('school')
      return exams
    } catch (error) {
      throw error
    }
  }
  public async getExam(schoolId: string) {
    try {
      const exams = await this.examModel.find({isDeleted: false , school:schoolId}).populate('school').populate('class_id')
      return exams
    } catch (error) {
      throw error
    }
  }
  public async updateExam(id: string, data: any) {
    try {
      const exam = await this.examModel.findByIdAndUpdate(id, data, { new: true })
      return exam
    } catch (error) {
      throw error
    }
  }
  public async deleteExam(id: string) {
    try {
      const exam = await this.examModel.findByIdAndUpdate(id, { isdeleted: true }, { new: true })
      return exam
    } catch (error) {
      throw error
    }
  }
}