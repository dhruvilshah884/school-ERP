import { models } from '@/models'

export class LeaveService {
  public async getLeavesByClassId(classId: string): Promise<any> {
    return await models.Leave.find({ class_id: classId , isDeleted:false }).populate('requested_by student_id approved_by rejected_by class_id school')
  }
  public async getLeavesByStudentId(studentId: string): Promise<any> {
   const students = await models.Leave.find({ student_id: studentId }).populate('requested_by student_id approved_by rejected_by class_id school')
   return students
  }
  public async createLeave(leave: any): Promise<any> {
    return await models.Leave.create(leave)
  }
  public async updateLeave(id: string, data: any): Promise<any> {
    return await models.Leave.findByIdAndUpdate(id, data)
  }
  public async deleteLeave(id: string): Promise<any> {
    return await models.Leave.findByIdAndUpdate(id, {isDeleted:true})
  }
  public async changeStatus(id: string, data: any): Promise<any> {
    const { status } = data
    const approved_by = status === 'APPROVED' ? data.approved_by : null
    const rejected_by = status === 'REJECTED' ? data.rejected_by : null
    return await models.Leave.findByIdAndUpdate(id, {
      status,
      approved_by,
      rejected_by
    })
  }
}
