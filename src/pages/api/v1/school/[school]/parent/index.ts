import { NextApiResponse } from 'next'
import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import { parentService } from '@/services/parent.service'
import { authCheckMiddleware } from '@/middleware/authCheckMiddleware'
import nextConnect from 'next-connect'
import { NextApiRequestWithUser } from '@/interface/NextApiRequestWithUser'

const service = new parentService()

export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)
  .get(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const parent = await service.getParent()
      res.status(200).json({ message: 'Parent fetched successfully', parent })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  })
  .post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const data = {
        ...req.body,
        school: req.query?.school as string
      }
      const parent = await service.createParent(data)
      res.status(201).json({ message: 'Parent created successfully', parent })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  })
