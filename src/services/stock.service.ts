import { models } from '@/models'

export class StockService {
  public async createStock(data: any) {
    const stock = await models.Stock.create(data)
    return stock
  }
  public async getStocks(school:string) {
    const stocks = await models.Stock.find({ isDeleted: false , school:school }).populate('school').populate('assigned_to').populate('assigned_by')
    return stocks
  }
  public async updateStock(id: string, data: any) {
    const stock = await models.Stock.findByIdAndUpdate(id, data, { new: true })
    return stock
  }
  public async deleteStock(id: string) {
    const stock = await models.Stock.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
    return stock
  }
  public async getStock(id: string) {
    const stock = await models.Stock.findById(id).populate('school').populate('assigned_to').populate('assigned_by')
    return stock
  }
}
