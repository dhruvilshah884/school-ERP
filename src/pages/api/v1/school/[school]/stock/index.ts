import { NextApiRequestWithUser } from '@/interface/NextApiRequestWithUser'
import { NextApiResponse } from 'next'
import { StockService } from '@/services/stock.service'
import { authCheckMiddleware } from '@/middleware/authCheckMiddleware'
import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import nextConnect from 'next-connect'

const service = new StockService()
export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)
  .get(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const stocks = await service.getStocks(req.query.school as string)
      res.status(200).json({ stocks })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  })
  .post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const data = {
        ...req.body,
        school: req.query.school,
        assigned_by: req.user._id
      }
      const stock = await service.createStock(data)
      res.status(200).json({ stock })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  })
