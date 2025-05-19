import { NextApiRequestWithUser } from '@/interface/NextApiRequestWithUser'
import { NextApiResponse } from 'next'
import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import { authCheckMiddleware } from '@/middleware/authCheckMiddleware'
import { StudentService } from '@/services/student.service'
import nextConnect from 'next-connect'

const studentService = new StudentService()
export default nextConnect()
  .use(dbConnectMiddleware)
  // .use(authCheckMiddleware)
  .get(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const student = await studentService.getAllDetailsByStudentId(req.query.id as string)
      res.status(200).json({ message: 'Student fetched successfully', student })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  })
  .patch(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const student = await studentService.updateStudent(req.query.id as string, req.body)
      res.status(200).json({ message: 'Student updated successfully', student })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  })
  .delete(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const student = await studentService.deleteStudent(req.query.id as string)
      res.status(200).json({ message: 'Student deleted successfully', student })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  })
