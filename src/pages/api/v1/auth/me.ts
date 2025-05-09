import { NextApiRequestWithUser } from '@/interface/NextApiRequestWithUser'
import authMiddleware from '@/middleware/authCheckMiddleware'
import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import { AuthService } from '@/services/auth.service'
import { NextApiResponse } from 'next'
import nextConnect from 'next-connect'

const authService = new AuthService()

export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authMiddleware)
  .get(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const user = await authService.me(req.user._id as string)
      res.status(200).json({ message: 'User fetched successfully', user })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  })
