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
      const stock = await service.getStock(req.query.id as string)
      res.status(200).json({ stock })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  })
  .put(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const stock = await service.updateStock(req.query.id as string, req.body)
      res.status(200).json({ stock })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  })
  .delete(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const stock = await service.deleteStock(req.query.id as string)
      res.status(200).json({ stock })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  })
