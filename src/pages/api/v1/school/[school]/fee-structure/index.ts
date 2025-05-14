import { NextApiRequestWithUser } from '@/interface/NextApiRequestWithUser'
import { NextApiResponse } from 'next'
import { FeeStructureService } from '@/services/feeStructure.service'
import { authCheckMiddleware } from '@/middleware/authCheckMiddleware'
import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import nextConnect from 'next-connect'

const service = new FeeStructureService()
export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)
  .get(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const feeStructure = await service.getFeeStructure(req.query.school as string)
      res.status(200).json(feeStructure)
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  })
  .post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
        const data = {
            ...req.body,
            school: req.query.school,
        }
      const feeStructure = await service.createFeeStructure(data)
      res.status(200).json(feeStructure)
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  })
