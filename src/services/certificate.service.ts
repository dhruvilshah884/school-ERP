import { models } from '@/models'

export class CertificateService {
  public async create(data: any) {
    return await models.Certificate.create(data)
  }
  public async findAll(schoolId: string) {
    return await models.Certificate.find({ isDeleted: false, school: schoolId })
      .populate('student_id')
      .populate('school')
  }
  public async findOne(id: string) {
    return await models.Certificate.findById(id)
  }
  public async update(id: string, data: any) {
    return await models.Certificate.findByIdAndUpdate(id, data, { new: true })
  }
  public async delete(id: string) {
    return await models.Certificate.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
  }
  public async getCertificateByStudent(studentId: string) {
    return await models.Certificate.find({ student_id: studentId, isDeleted: false })
      .populate('student_id')
      .populate('school')
  }
}
