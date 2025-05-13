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
      const events = await service.getEvents()
      res.status(200).json({ events })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  })
  .post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const data = {
        ...req.body,
        created_by: req.user._id,
        school: req.query.school
      }
      const event = await service.createEvent(data)
      res.status(201).json({ event })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  })
