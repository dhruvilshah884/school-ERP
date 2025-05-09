import {AuthService} from '@/services/auth.service'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'

const authService = new AuthService()

export default nextConnect()
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const user = await authService.roles(req.body.role)
      res.status(200).json({message:"Roles fetched successfully",user})
    } catch (error:any) {
      res.status(500).json({ error: error.message })
    }
  })
