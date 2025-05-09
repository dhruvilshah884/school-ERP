import { DataStoredInToken } from '@/interface/Auth'
import { IAuthUser } from '@/interface/AuthUser'
import { models } from '@/models'
import { verify } from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'

export const authCheckMiddleware = async (req: NextApiRequest & { user: any }, res: NextApiResponse, next: any) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) throw new Error('Token not provided')
    const decodedToken = verify(token, process.env.SECRET_KEY as string) as DataStoredInToken
    const user = await models.User.findById(decodedToken._id)
    if (!user) throw new Error('User not found')
    req.user = {
      ...user.toObject()
    }
    next()
  } catch (error: any) {
    res.status(401).json({ message: error.message || 'Unauthorized' })
  }
}
