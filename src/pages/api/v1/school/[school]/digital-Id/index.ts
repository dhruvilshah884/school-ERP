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
      const digitalIds = await service.findAll(req.query.school as string)
      res.status(200).json({
        data: digitalIds
      })
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      })
    }
  })
  .post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const data = {
        ...req.body,
        school: req.query.school
      }
      const digitalId = await service.create(data)
      res.status(201).json({
        data: digitalId
      })
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      })
    }
  })
