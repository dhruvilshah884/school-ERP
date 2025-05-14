import { models } from '@/models'

export class GatePassService {
  public async requestEarlyCheckout(data: any) {
    try {
      const response = await models.GatePass.create(data)
      return response
    } catch (error) {
      throw error
    }
  }
  public async getGatePass(id: string) {
    try {
      const response = await models.GatePass.findById(id).populate('student_id').populate('school').populate('issued_by')
      return response
    } catch (error) {
      throw error
    }
  }
  public async verifiedGatePass(id: string, data: any) {
    try {
      const response = await models.GatePass.findByIdAndUpdate(id, data)
      return response
    } catch (error) {
      throw error
    }
  }
  public async deleteGatePass(id: string) {
    try {
      const response = await models.GatePass.findByIdAndUpdate(id, { isDeleted: true })
      return response
    } catch (error) {
      throw error
    }
  }
  public async getGatePasses(schoolId: string) {
    try {
      const response = await models.GatePass.find({ isDeleted: false , school: schoolId })
        .populate('student_id')
        .populate('school')
        .populate('issued_by')
      return response
    } catch (error) {
      throw error
    }
  }
}
