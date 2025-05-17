import { NextApiRequestWithUser } from '@/interface/NextApiRequestWithUser'
import { NextApiResponse } from 'next'
import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import { authCheckMiddleware } from '@/middleware/authCheckMiddleware'
import { AssignmentService } from '@/services/assignment.service'
import nextConnect from 'next-connect'

const service = new AssignmentService()

export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)
  .get(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const assignments = await service.getAssignments(req.query.school as string)
      res.status(200).json(assignments)
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
        success: false
      })
    }
  })
  .post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const data = {
        ...req.body,
        school: req.query.school,
        teacher_id: req.teacher._id
      }
      const assignment = await service.uploadAssignment(data)
      res.status(200).json(assignment)
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
        success: false
      })
    }
  })
