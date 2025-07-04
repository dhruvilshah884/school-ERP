import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import { AuthService } from '@/services/auth.service'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'

const authService = new AuthService()

export default nextConnect()
  .use(dbConnectMiddleware)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const user = await authService.resendOtp(req.body.id)
      res.status(200).json({ message: 'OTP sent successfully', user })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  })
