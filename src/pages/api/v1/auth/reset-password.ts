import {AuthService} from '@/services/auth.service'
import { NextApiRequest, NextApiResponse } from 'next'
import { IUser } from '@/interface/User'
import nextConnect from 'next-connect'

const authService = new AuthService()

export default nextConnect()
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const data: IUser = req.body
      const user = await authService.resetPassword(data)
      res.status(200).json(user)
    } catch (error:any) {
      res.status(500).json({ error: error.message })
    }
  })
