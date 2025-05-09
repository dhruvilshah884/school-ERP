import { NextApiRequestWithUser } from '@/interface/NextApiRequestWithUser'
import { NextApiResponse } from 'next'
import { teacherService } from '@/services/teacher.service'
import nextConnect from 'next-connect'
import { authCheckMiddleware } from '@/middleware/authCheckMiddleware'
import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'

const service = new teacherService()

export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)
  .get(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const teacher = await service.getTeacher()
      res.status(200).json({
        status: true,
        data: teacher
      })
    } catch (error: any) {
      res.status(500).json({
        status: false,
        message: error.message
      })
    }
  })
  .post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const data = {
        ...req.body,
        school: req.user.school
      }
      const teacher = await service.createTeacher(data)
      res.status(200).json({
        status: true,
        data: teacher
      })
    } catch (error: any) {
      res.status(500).json({
        status: false,
        message: error.message
      })
    }
  })
