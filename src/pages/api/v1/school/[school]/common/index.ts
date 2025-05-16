import { NextApiRequestWithUser } from '@/interface/NextApiRequestWithUser'
import { NextApiResponse } from 'next'
import { AuthService } from '@/services/auth.service'
import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import nextConnect from 'next-connect'

const service = new AuthService()
export default nextConnect()
  .use(dbConnectMiddleware)
  .post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const data = await service.commonSignup(req.body , req.query.school as string)
      res.status(200).json({
        message: 'Signup successful',
        data
      })
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      })
    }
  })