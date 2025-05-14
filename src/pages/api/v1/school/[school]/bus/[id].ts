import { NextApiRequestWithUser } from '@/interface/NextApiRequestWithUser'
import { NextApiResponse } from 'next'
import { BusService } from '@/services/bus.service'
import { authCheckMiddleware } from '@/middleware/authCheckMiddleware'
import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import nextConnect from 'next-connect'

const service = new BusService()
export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)
  .get(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const bus = await service.getBusById(req.query.id as string)
      res.status(200).json(bus)
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  })
  .put(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const bus = await service.updateBus(req.query.id as string, req.body)
      res.status(200).json(bus)
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  })
  .delete(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const bus = await service.deleteBus(req.query.id as string)
      res.status(200).json(bus)
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  })
