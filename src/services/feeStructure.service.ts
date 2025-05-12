import { models } from '@/models'

export class FeeStructureService {
  public async createFeeStructure(data: any) {
    return await models.FeeStructure.create(data)
  }
  public async getFeeStructure() {
    return await models.FeeStructure.find().populate('school class_id')
  }
  public async getFeeStructureById(id: string) {
    return await models.FeeStructure.findById(id).populate('school class_id')
  }
  public async updateFeeStructure(id: string, data: any) {
    return await models.FeeStructure.findByIdAndUpdate(id, data, { new: true })
  }
  public async deleteFeeStructure(id: string) {
    return await models.FeeStructure.findByIdAndDelete(id)
  }
}
