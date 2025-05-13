import { NextApiRequestWithUser } from '@/interface/NextApiRequestWithUser'
import { NextApiResponse } from 'next'
import { FeedBackService } from '@/services/feedBack.service'
import { authCheckMiddleware } from '@/middleware/authCheckMiddleware'
import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import nextConnect from 'next-connect'

const service = new FeedBackService()
export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)
  .get(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const feedbacks = await service.getFeedBacks(req.query.school as string)
      res.status(200).json(feedbacks)
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  })
  .post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const data = {
        ...req.body,
        school: req.query.school,
        recorded_by: req.user._id
      }
      const feedback = await service.createFeedBack(data)
      res.status(200).json(feedback)
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  })