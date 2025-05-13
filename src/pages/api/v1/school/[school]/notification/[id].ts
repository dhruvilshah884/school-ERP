import { NextApiRequestWithUser } from '@/interface/NextApiRequestWithUser'
import { NextApiResponse } from 'next'
import { NotificationService } from '@/services/notification.service'
import { authCheckMiddleware } from '@/middleware/authCheckMiddleware'
import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import nextConnect from 'next-connect'

const service = new NotificationService()
export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)
  .get(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const notification = await service.getNotificationById(req.query.id as string)
      res.status(200).json({ notification })
    } catch (error: any) {
      res.status(500).json({ message: error.message, success: false })
    }
  })
  .put(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const notification = await service.updateNotification(req.query.id as string, req.body)
      res.status(200).json({ notification })
    } catch (error: any) {
      res.status(500).json({ message: error.message, success: false })
    }
  })
  .delete(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const notification = await service.deleteNotification(req.query.id as string)
      res.status(200).json({ notification })
    } catch (error: any) {
      res.status(500).json({ message: error.message, success: false })
    }
  })
