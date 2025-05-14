import { models } from '@/models'

export class BusService {
  public async createBus(data: any) {
    try {
      const bus = await models.Bus.create(data)
      return bus
    } catch (error) {
      throw new Error(`Error creating bus: ${error}`)
    }
  }
  public async getBusById(id: string) {
    try {
      const bus = await models.Bus.findById(id)
      return bus
    } catch (error) {
      throw new Error(`Error fetching bus: ${error}`)
    }
  }
  public async getAllBuses(school: string) {
    try {
      const buses = await models.Bus.find({ school: school , isDeleted: false })
      return buses
    } catch (error) {
      throw new Error(`Error fetching buses: ${error}`)
    }
  }
  public async updateBus(id: string, data: any) {
    try {
      const bus = await models.Bus.findByIdAndUpdate(id, data, { new: true })
      return bus
    } catch (error) {
      throw new Error(`Error updating bus: ${error}`)
    }
  }
  public async deleteBus(id: string) {
    try {
      const bus = await models.Bus.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
      return bus
    } catch (error) {
      throw new Error(`Error deleting bus: ${error}`)
    }
  }
}
