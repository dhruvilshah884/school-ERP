import { models } from '@/models'
import QRCode from 'qrcode'

export class DigitalIdCardService {
  public async create(data: any): Promise<any> {
    const studentData = await models.Student.findById(data.student_id).populate('user_id')
    if (!studentData) {
      throw new Error('Student not found')
    }
    const qrCodeUrl = await QRCode.toDataURL(JSON.stringify(studentData))

    const digitalId = await models.DigitalId.create({
      ...data,
      qr_code: qrCodeUrl
    })
    return digitalId
  }
  public async findById(id: string): Promise<any> {
    const digitalId = await models.DigitalId.findById(id)
    if (!digitalId) {
      throw new Error('DigitalId not found')
    }
    return digitalId
  }
  public async findAll(schoolId: string): Promise<any> {
    const digitalIds = await models.DigitalId.find({ isDeleted: false, school: schoolId })
    return digitalIds
  }
  public async update(id: string, data: any): Promise<any> {
    const digitalId = await models.DigitalId.findByIdAndUpdate(id, data, { new: true })
    if (!digitalId) {
      throw new Error('DigitalId not found')
    }
    return digitalId
  }
  public async delete(id: string): Promise<any> {
    const digitalId = await models.DigitalId.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
    if (!digitalId) {
      throw new Error('DigitalId not found')
    }
    return digitalId
  }
}
