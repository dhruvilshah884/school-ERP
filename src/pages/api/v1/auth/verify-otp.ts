import {AuthService} from '@/services/auth.service'
import { NextApiRequest, NextApiResponse } from 'next'
import { IUser } from '@/interface/User'
import nextConnect from 'next-connect'

const authService = new AuthService()

export default nextConnect()
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const user = await authService.verifyOtp(req.body.id, req.body.otp)
      res.status(200).json({message:"OTP verified successfully",user})
    } catch (error:any) {
      res.status(500).json({ error: error.message })
    }
  })
