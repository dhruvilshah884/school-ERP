import { models } from '@/models'
import { ISchool } from '@/interface/School'

export class SchoolService {
  private school = models.School

  public async createSchool(schoolData: ISchool): Promise<ISchool> {
    const school = await this.school.create({
      ...schoolData
    })
    return school
  }
  public async getSchools(): Promise<ISchool[]> {
    const schools = await this.school.find({ isDeleted: false })
    return schools
  }
  public async getSchoolById(id: string): Promise<ISchool> {
    const school = await this.school.findById(id)
    return school
  }
  public async updateSchool(id: string, data: ISchool): Promise<ISchool> {
    const school = await this.school.findByIdAndUpdate(id, data, { new: true })
    return school
  }
  public async deleteSchool(id: string): Promise<ISchool> {
    const school = await this.school.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
    return school
  }
}
