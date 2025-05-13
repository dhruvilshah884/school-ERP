import { models } from '@/models'

export class EventService {
  public async createEvent(data: any): Promise<any> {
    return await models.Event.create(data)
  }
  public async getEvents(): Promise<any> {
    return await models.Event.find({ isDeleted: false }).populate('created_by school')
  }
  public async getEvent(id: string): Promise<any> {
    return await models.Event.findById(id).populate('created_by school')
  }
  public async updateEvent(id: string, data: any): Promise<any> {
    return await models.Event.findByIdAndUpdate(id, data, { new: true })
  }
  public async deleteEvent(id: string): Promise<any> {
    return await models.Event.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
  }
}
