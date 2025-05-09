import { DataStoredInToken } from '@/interface/Auth'
import { IAuthUser } from '@/interface/AuthUser'
import { IUser } from '@/interface/User'
import { models } from '@/models'
import { verify } from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'

interface Checks {
  shouldAssociatedWithLaboratory?: boolean
  roleCheck?: {
    permissions: any
  }
}

const authMiddleware =
  (checks?: Checks) => async (req: NextApiRequest & { user: IAuthUser }, res: NextApiResponse, next: any) => {
    try {
      const Authorization =
        req.cookies['Authorization'] ||
        (req.headers.authorization ? req.headers.authorization.split('Bearer ')[1] : null)

      if (Authorization) {
        const secretKey: string = process.env.SECRET_KEY as string
        const verificationResponse = (await verify(Authorization, secretKey)) as DataStoredInToken

        const userId = verificationResponse._id
        const findUser: any | IUser | undefined = (await models.User.findById(userId))?.toJSON()

        if (!findUser) {
          res.status(404).json({ success: false, message: 'User not found' })
          return
        }

        let school:any
        if(req.query.school && school?._id.toString() !== (req.query.school as string)) {
          res.status(401).json({ success: false, message: 'You are not authorized to access this resource' })
          return
        }

        if (findUser) {
          req.user = { ...findUser, school }
          next()
        } else {
          res.status(401).json({ success: false, message: 'Wrong authentication token' })
        }
      } else {
        res.status(404).json({ success: false, message: 'Authentication token missing' })
      }
    } catch (error) {
      console.error('error in auth middleware -> ', error)
      res.status(401).json({ success: false, message: 'Wrong authentication token' })
    }
  }

export default authMiddleware