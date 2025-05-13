import { models } from '@/models'

export class EventService {
  private concentModel = models.Concent
  private eventModel = models.Event
  public async createEvent(data: any): Promise<any> {
    const event = await this.eventModel.create(data)
    const students = await models.Student.find({ school: event.school })
    const concents = students.map(student => ({
      event_id: event._id,
      student_id: student._id
    }))
    await this.concentModel.insertMany(concents)
    return event
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
  public async updateConcent(id: string, data: any): Promise<any> {
    return await models.Concent.findByIdAndUpdate(id, data, { new: true })
  }
  public async getConcentByEventId(eventId: string): Promise<any> {
    const concent = await models.Concent.find({ event_id: eventId }).populate('student_id')
    return concent
  }
  public async getConcentByStudentId(studentId: string): Promise<any> {
   const concent = await models.Concent.find({ student_id: studentId }).populate('event_id')
    return concent
  }
}
