import { models } from '@/models'

export class StudentService {
  private student = models.Student

  public async createStudent(data: any): Promise<any> {
    const student = await this.student.create(data)
    return student
  }
  public async getStudents(school: string): Promise<any> {
    const students = await this.student
      .find({ isDeleted: false, school: school })
      .populate('user_id')
      .populate('school')
      .populate('class_id')
    return students
  }
  public async getStudent(id: string): Promise<any> {
    const student = await this.student.findById(id).populate('user_id').populate('school').populate('class_id')
    return student
  }
  public async updateStudent(id: string, data: any): Promise<any> {
    const student = await this.student.findByIdAndUpdate(id, data, { new: true })
    return student
  }
  public async deleteStudent(id: string): Promise<any> {
    const student = await this.student.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
    return student
  }
  public async getMedicalHistory(id: string): Promise<any> {
    const student = await this.student.findById(id)
    return student.medical_history
  }
  public async getStudentByClass(classId: string): Promise<any> {
    const students = await this.student.find({ class_id: classId })
    return students
  }
  public async getAllDetailsByStudentId(id: string): Promise<any> {
    // student / attendance / marks / fee / assignment / rechecking / certificate / studentTransportation / library / bus

    const student = await this.student.findById(id).populate('user_id').populate('school').populate('class_id')
    if (!student) {
      throw new Error('Student not found')
    }
    const attendance = await models.Attendance.find({ student_id: id })
    const marks = await models.Marks.find({ student_id: id })
    const fee = await models.FeePayment.find({ student_id: id })
    const rechecking = await models.Rechecking.find({ student_id: id })
    const certificate = await models.Certificate.find({ student_id: id })
    const studentTransportation = await models.StudentTransportation.find({ student_id: id })
    const library = await models.Library.find({ student_id: id })
    return {
      student,
      attendance,
      marks,
      fee,
      rechecking,
      certificate,
      studentTransportation,
      library
    }
  }
}
