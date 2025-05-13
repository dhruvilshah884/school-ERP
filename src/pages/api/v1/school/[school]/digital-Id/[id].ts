import { NextApiRequestWithUser } from '@/interface/NextApiRequestWithUser'
import { NextApiResponse } from 'next'
import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import { authCheckMiddleware } from '@/middleware/authCheckMiddleware'
import { DigitalIdCardService } from '@/services/digitalId.service'
import nextConnect from 'next-connect'

const service = new DigitalIdCardService()

export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)
  .get(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const digitalId = await service.findById(req.query.id as string)
      res.status(200).json({
        data: digitalId
      })
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      })
    }
  })
  .put(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const digitalId = await service.update(req.query.id as string, req.body)
      res.status(200).json({
        data: digitalId
      })
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      })
    }
  })
  .delete(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const digitalId = await service.delete(req.query.id as string)
      res.status(200).json({
        data: digitalId
      })
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      })
    }
  })