import { models } from '@/models'

export class libraryService {
  public async createLibrary(data: any): Promise<any> {
    try {
      const date = new Date()
      const dueDate = new Date(data.dueDate)
      const returnDate = new Date(data.returnDate)
      let fineAmount = 0

      if (returnDate > dueDate) {
        const diffTime = Math.abs(returnDate.getTime() - dueDate.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        fineAmount = diffDays * 10
      }
      const newLibrary = await models.Library.create({
        ...data,
        fineAmount: fineAmount,
        status: returnDate > dueDate ? 'overdue' : 'issued'
      })

      return newLibrary
    } catch (error) {
      throw new Error(`Error creating library: ${error}`)
    }
  }
  public async getLibraryById(id: string): Promise<any> {
    try {
      const library = await models.Library.findById(id).populate('student_id school')
      if (!library) {
        throw new Error('Library not found')
      }
      return library
    } catch (error) {
      throw new Error(`Error fetching library: ${error}`)
    }
  }
  public async getAllLibrary(schoolId:string): Promise<any> {
    try {
      const libraries = await models.Library.find({school:schoolId}).populate('student_id school')
      return libraries
    } catch (error) {
      throw new Error(`Error fetching libraries: ${error}`)
    }
  }
  public async updateLibrary(id: string, data: any): Promise<any> {
    try {
      const library = await models.Library.findByIdAndUpdate(id, data, { new: true }).populate('student_id school')
      if (!library) {
        throw new Error('Library not found')
      }
      return library
    } catch (error) {
      throw new Error(`Error updating library: ${error}`)
    }
  }
  public async deleteLibrary(id: string): Promise<any> {
    try {
      const library = await models.Library.findByIdAndDelete(id)
      if (!library) {
        throw new Error('Library not found')
      }
      return library
    } catch (error) {
      throw new Error(`Error deleting library: ${error}`)
    }
  }
  public async getLibraryByStudentId(studentId: string): Promise<any> {
    try {
      const library = await models.Library.find({ student_id: studentId }).populate('student_id school')
      if (!library) {
        throw new Error('Library not found')
      }
      return library
    } catch (error) {
      throw new Error(`Error fetching library: ${error}`)
    }
  }
}
