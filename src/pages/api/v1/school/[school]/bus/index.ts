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
  .post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const data = {
        ...req.body,
        school: req.query.school
      }
      const bus = await service.createBus(data)
      res.status(201).json(bus)
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  })
  .get(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const buses = await service.getAllBuses(req.query.school as string)
      res.status(200).json(buses)
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  })
