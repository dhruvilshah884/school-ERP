import { NextApiRequestWithUser } from '@/interface/NextApiRequestWithUser'
import { NextApiResponse } from 'next'
import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import { authCheckMiddleware } from '@/middleware/authCheckMiddleware'
import { EventService } from '@/services/event.service'
import nextConnect from 'next-connect'

const service = new EventService()

export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)
  .get(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const event = await service.getEvent(req.query.id as string)
      res.status(200).json({ event })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  })
  .put(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const event = await service.updateEvent(req.query.id as string, req.body)
      res.status(200).json({ event })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  })
  .delete(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const event = await service.deleteEvent(req.query.id as string)
      res.status(200).json({ event })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  })
