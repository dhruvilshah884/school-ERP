import { NextApiRequestWithUser } from '@/interface/NextApiRequestWithUser'
import { NextApiResponse } from 'next'
import { MarkService } from '@/services/marks.service'
import { authCheckMiddleware } from '@/middleware/authCheckMiddleware'
import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import nextConnect from 'next-connect'

const service = new MarkService()
export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)
  .get(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const marks = await service.getMarks(req.query.school as string)
      res.status(200).json({
        success: true,
        data: marks
      })
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
        entered_by: req.user._id,
        school: req.query.school
      }
      const createdMark = await service.createMarks(data)
      res.status(201).json({
        success: true,
        data: createdMark
      })
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  })
