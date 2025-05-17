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
      const teacher = await service.getAllTeacherDetails(req.query.id as string)
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
  .put(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const teacher = await service.updateTeacher(req.query.id, req.body)
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
  .delete(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const teacher = await service.deleteTeacher(req.query.id)
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
