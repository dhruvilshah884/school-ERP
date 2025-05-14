import { models } from '@/models'

export class SubjectService {
  private subjectModel = models.Subject

  public async getAllSubjects(school:string) {
    return this.subjectModel.find({ isDeleted: false , school:school }).populate('teacher_id').populate('class_id').populate('school')
  }
  public async getSubjectById(id: string) {
    return this.subjectModel.findById(id).populate('teacher_id').populate('class_id').populate('school')
  }
  public async createSubject(subject: any) {
    return this.subjectModel.create(subject)
  }
  public async updateSubject(id: string, subject: any) {
    return this.subjectModel.findByIdAndUpdate(id, subject, { new: true })
  }
  public async deleteSubject(id: string) {
    return this.subjectModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
  }
}
