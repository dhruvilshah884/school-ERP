import { NextApiRequestWithUser } from '@/interface/NextApiRequestWithUser'
import { NextApiResponse } from 'next'
import { GatePassService } from '@/services/gatePass.service'
import { authCheckMiddleware } from '@/middleware/authCheckMiddleware'
import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import nextConnect from 'next-connect'

const service = new GatePassService()
export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)
  .get(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const response = await service.getGatePasses()
      res.status(200).json({
        status: 'success',
        data: response
      })
    } catch (error: any) {
      res.status(500).json({
        status: 'error',
        message: error.message
      })
    }
  })
  .post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const data = {
        ...req.body,
        school: req.query.school,
        issued_by: req.user._id
      }
      const response = await service.requestEarlyCheckout(data)
      res.status(200).json({
        status: 'success',
        data: response
      })
    } catch (error: any) {
      res.status(500).json({
        status: 'error',
        message: error.message
      })
    }
  })
