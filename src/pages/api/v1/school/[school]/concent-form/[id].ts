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
  .put(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const data = {
        ...req.body,
        issued_by: req.user._id
      }
      const concent = await service.updateConcent(req.query.id as string, data)
      res.status(201).json({ concent })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  })
