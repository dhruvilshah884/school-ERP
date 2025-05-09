import { NextApiRequestWithUser } from '@/interface/NextApiRequestWithUser'
import { NextApiResponse } from 'next'
import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import { authCheckMiddleware } from '@/middleware/authCheckMiddleware'
import { attendanceService } from '@/services/attendance.service'
import nextConnect from 'next-connect'

const service = new attendanceService()

export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)
  .post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const data = {
        ...req.body,
        marked_by: req.user._id,
        school: req.query.school
      }
      const result = await service.createAttendace(data)
      res.status(200).json({
        success: true,
        data: result
      })
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      })
    }
  })
