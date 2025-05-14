import { models } from '@/models'

export class StudentTransportationService {
  public async createStudentTransportation(data: any) {
    try {
      const studentTransportation = await models.StudentTransportation.create(data)
      return studentTransportation
    } catch (error) {
      throw new Error(`Error creating student transportation: ${error}`)
    }
  }

  public async getStudentTransportationById(id: string) {
    try {
      const studentTransportation = await models.StudentTransportation.findById(id)
      return studentTransportation
    } catch (error) {
      throw new Error(`Error fetching student transportation: ${error}`)
    }
  }
  public async getAllStudentTransportations(school: string) {
    try {
      const studentTransportations = await models.StudentTransportation.find({
        school: school,
        isDeleted: false
      }).populate('student_id bus class_id')
      return studentTransportations
    } catch (error) {
      throw new Error(`Error fetching student transportations: ${error}`)
    }
  }
  public async updateStudentTransportation(id: string, data: any) {
    try {
      const studentTransportation = await models.StudentTransportation.findByIdAndUpdate(id, data, { new: true })
      return studentTransportation
    } catch (error) {
      throw new Error(`Error updating student transportation: ${error}`)
    }
  }
  public async deleteStudentTransportation(id: string) {
    try {
      const studentTransportation = await models.StudentTransportation.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
      )
      return studentTransportation
    } catch (error) {
      throw new Error(`Error deleting student transportation: ${error}`)
    }
  }
  public async getStudentTransportationByStudentId(studentId: string) {
    try {
      const studentTransportation = await models.StudentTransportation.find({ student_id: studentId }).populate(
        'student_id bus class_id'
      )
      return studentTransportation
    } catch (error) {
      throw new Error(`Error fetching student transportation by student ID: ${error}`)
    }
  }
}
