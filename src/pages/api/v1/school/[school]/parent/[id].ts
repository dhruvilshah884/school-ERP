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
      const parent = await service.getParentById(req.query?.id as string)
      res.status(200).json({ message: 'Parent fetched successfully', parent })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  })
  .put(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const parent = await service.updateParent(req.query?.id as string, req.body)
      res.status(200).json({ message: 'Parent updated successfully', parent })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  })
  .delete(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const parent = await service.deleteParent(req.query?.id as string)
      res.status(200).json({ message: 'Parent deleted successfully', parent })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  })
