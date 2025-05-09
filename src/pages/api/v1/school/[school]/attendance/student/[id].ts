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
  .get(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const attendance = await service.getAttendanceByStudent(req.query.id as string)
      res.status(200).json({
        success: true,
        data: attendance
      })
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      })
    }
  })
