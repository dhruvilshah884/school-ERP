import { AuthService } from '@/services/auth.service'
import { NextApiRequest, NextApiResponse } from 'next'
import { IUser } from '@/interface/User'
import nextConnect from 'next-connect'
import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'

const authService = new AuthService()

export default nextConnect()
  .use(dbConnectMiddleware)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const data: IUser = req.body
      const user = await authService.signup(data)
      res.status(200).json({ message: 'Signup successful', user })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  })
