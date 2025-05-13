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
//   .get(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
//     try {
//       const feedback = await service.getFeedBacks(req.query.school as string)
//       res.status(200).json(feedback)
//     } catch (error: any) {
//       res.status(500).json({
//         success: false,
//         message: error.message
//       })
//     }
//   })
  .put(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const feedback = await service.updateFeedBack(req.query.id as string, req.body)
      res.status(200).json(feedback)
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  })
  .delete(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const feedback = await service.deleteFeedBack(req.query.id as string)
      res.status(200).json(feedback)
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  })
