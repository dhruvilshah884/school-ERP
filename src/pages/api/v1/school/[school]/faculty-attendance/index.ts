import { NextApiRequestWithUser } from '@/interface/NextApiRequestWithUser'
import { NextApiResponse } from 'next'
import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import { authCheckMiddleware } from '@/middleware/authCheckMiddleware'
import { facultyAttendance } from '@/services/facultyAttendance.service'
import nextConnect from 'next-connect'

const service = new facultyAttendance()

export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)
  .post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const data = {
        ...req.body,
        teacher_id: req.user._id,
        school: req.query.school
      }
      const result = await service.createFacultyAttendance(data)
      res.status(200).json({
        message: 'Faculty Attendance Created Successfully',
        data: result
      })
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      })
    }
  })
