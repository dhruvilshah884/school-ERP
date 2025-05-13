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
      const response = await service.getGatePass(req.query.id as string)
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
  .put(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const response = await service.verifiedGatePass(req.query.id as string, req.body)
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
  .delete(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const response = await service.deleteGatePass(req.query.id as string)
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
