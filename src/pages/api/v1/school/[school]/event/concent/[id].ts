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
      const concents = await service.getConcentByEventId(req.query.id as string)
      res.status(200).json({ concents })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  })
  