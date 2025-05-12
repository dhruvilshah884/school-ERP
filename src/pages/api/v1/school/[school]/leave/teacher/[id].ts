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
  .put(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const data = {
        ...req.body,
        approved_by: req.user._id,
        rejected_by: req.user._id
      }
      const leave = await service.changeStatus(req.query.id as string, data)
      res.status(200).json(leave)
    } catch (error: any) {
      res.status(500).json({ error: error.message, success: false })
    }
  })
