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
      const notifications = await service.getNotifications(req.user.role)
      res.status(200).json({ notifications })
    } catch (error: any) {
      res.status(500).json({ message: error.message, success: false })
    }
  })
  .post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const data = {
        ...req.body,
        school: req.query.school,
        issued_by: req.user._id
      }
      const notification = await service.createNotification(data)
      res.status(201).json({ notification })
    } catch (error: any) {
      res.status(500).json({ message: error, success: false })
    }
  })
