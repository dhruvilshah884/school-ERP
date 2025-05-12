import { NextApiRequestWithUser } from '@/interface/NextApiRequestWithUser'
import { NextApiResponse } from 'next'
import { LeaveService } from '@/services/leave.service'
import { authCheckMiddleware } from '@/middleware/authCheckMiddleware'
import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import nextConnect from 'next-connect'

const service = new LeaveService()
export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)
  .post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const data = {
        ...req.body,
        requested_by: req.user._id,
        school:req.query.school
      }
      const leave = await service.createLeave(data)
      res.status(201).json(leave)
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  })
