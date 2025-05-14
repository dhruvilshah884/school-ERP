import { NextApiRequestWithUser } from '@/interface/NextApiRequestWithUser'
import { NextApiResponse } from 'next'
import { examService } from '@/services/exam.service'
import { authCheckMiddleware } from '@/middleware/authCheckMiddleware'
import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import nextConnect from 'next-connect'

const service = new examService()
export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)
  .get(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const exams = await service.getExam(req.query.school as string)
      res.status(200).json({
        success: true,
        data: exams
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
      const data = req.body
      const schoolId = req.query.school as string
      const examData = {
        ...data,
        school: schoolId
      }
      const createdExam = await service.createExam(examData)
      res.status(201).json({
        success: true,
        data: createdExam
      })
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  })
