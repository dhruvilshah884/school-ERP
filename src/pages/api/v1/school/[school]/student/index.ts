import { NextApiRequestWithUser } from '@/interface/NextApiRequestWithUser'
import { NextApiResponse } from 'next'
import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import { authCheckMiddleware } from '@/middleware/authCheckMiddleware'
import { StudentService } from '@/services/student.service'
import nextConnect from 'next-connect'

const studentService = new StudentService()

export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)
  .get(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const students = await studentService.getStudents()
      res.status(200).json({ message: 'Students fetched successfully', students })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  })
  .post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
        console.log(req.query?.school)
      const data = {
        ...req.body,
        school: req.query?.school as string
      }
      const student = await studentService.createStudent(data)
      res.status(201).json({ message: 'Student created successfully', student })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  })
