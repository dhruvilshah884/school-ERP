import { models } from '@/models'

export class parentService {
  private parentModel = models.Parent
  public async createParent(parent: any) {
    const newParent = await this.parentModel.create(parent)
    return newParent
  }
  public async getParent(schoolId: string) {
    const parent = await this.parentModel
      .find({ isDeleted: false, school: schoolId })
      .populate('user_id')
      .populate('student_id')
      .populate('school')
    return parent
  }
  public async getParentById(id: any) {
    const parent = await this.parentModel.findById(id).populate('user_id').populate('student_id').populate('school')
    return parent
  }
  public async updateParent(id: any, parent: any) {
    const updateParent = await this.parentModel.findByIdAndUpdate(id, parent, { new: true })
    return updateParent
  }
  public async deleteParent(id: any) {
    const deleteParent = await this.parentModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
    return deleteParent
  }
  public async getStudentAllDetailByParentId(id: any) {
    const parent = await this.parentModel.findById(id).populate('student_id').populate('school')
    const student = await models.Student.findById(parent.student_id).populate('class_id')
    const attendance = await models.Attendance.find({ student_id: student._id }).populate('class_id').populate('school')
    const marks = await models.Marks.find({ student_id: student._id })
      .populate('exam_id')
      .populate('school')
    const feePayment = await models.FeePayment.find({ student_id: student._id })
      .populate('fee_structure_id')
      .populate('school')
    const leave = await models.Leave.find({ student_id: student._id }).populate('school')
    const rechecking = await models.Rechecking.find({ student_id: student._id }).populate('school')
    const gatePass = await models.GatePass.find({ student_id: student._id }).populate('school')
    const digitalId = await models.DigitalId.find({ student_id: student._id }).populate('school')
    const certificate = await models.Certificate.find({ student_id: student._id }).populate('school')
    const library = await models.Library.find({ student_id: student._id }).populate('school')
    const studentTransportation = await models.StudentTransportation.find({ student_id: student._id }).populate(
      'school'
    )
    return {
      parent,
      student,
      attendance,
      marks,
      feePayment,
      leave,
      rechecking,
      gatePass,
      digitalId,
      certificate,
      library,
      studentTransportation
    }
  }
}
