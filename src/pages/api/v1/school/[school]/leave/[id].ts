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
      const leave = await service.updateLeave(req.query.id as string, req.body)
      res.status(201).json(leave)
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  })
