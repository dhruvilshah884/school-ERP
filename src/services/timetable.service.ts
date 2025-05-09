import { models } from '@/models'

export class timetableService {
  private timetableModel = models.TimeTable
  public async getAllTimetables() {
    return this.timetableModel.find({ isDeleted: false }).populate('subject_id').populate('class_id').populate('school')
  }
  public async getTimetableById(id: string) {
    return this.timetableModel.findById(id).populate('subject_id').populate('class_id').populate('school')
  }
  public async createTimetable(timetable: any) {
    return this.timetableModel.create(timetable)
  }
  public async updateTimetable(id: string, timetable: any) {
    return this.timetableModel.findByIdAndUpdate(id, timetable, { new: true })
  }
  public async deleteTimetable(id: string) {
    return this.timetableModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
  }
}
