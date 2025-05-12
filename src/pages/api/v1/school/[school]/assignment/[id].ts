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
      const { id } = req.query
      const assignment = await service.getAssignment(id as string)
      res.status(200).json(assignment)
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
        success: false
      })
    }
  })
  .put(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const { id } = req.query
      const assignment = await service.updateAssignment(id as string, req.body)
      res.status(200).json(assignment)
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
        success: false
      })
    }
  })
  .delete(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const { id } = req.query
      const assignment = await service.deleteAssignment(id as string)
      res.status(200).json(assignment)
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
        success: false
      })
    }
  })
