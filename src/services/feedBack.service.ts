import { models } from '@/models'

export class FeedBackService {
  private model = models.FeedBack
  public async createFeedBack(data: any) {
    return await this.model.create(data)
  }
  public async getFeedBacks(schoolId: string) {
    return await this.model.find({ school: schoolId, isDeleted: false }).populate('recorded_by')
  }
  public async updateFeedBack(id: string, data: any) {
    return await this.model.findByIdAndUpdate(id, data, { new: true })
  }
  public async deleteFeedBack(id: string) {
    return await this.model.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
  }
}
