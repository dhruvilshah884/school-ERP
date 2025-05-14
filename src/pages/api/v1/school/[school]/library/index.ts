import { NextApiRequestWithUser } from '@/interface/NextApiRequestWithUser'
import { NextApiResponse } from 'next'
import { libraryService } from '@/services/library.service'
import { authCheckMiddleware } from '@/middleware/authCheckMiddleware'
import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import nextConnect from 'next-connect'

const service = new libraryService()
export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)
  .get(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const data = await service.getAllLibrary(req.query.school as string)
      return res.status(200).json(data)
    } catch (error: any) {
      return res.status(500).json({ error: error.message, success: false })
    }
  })
  .post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const dataAdd = {
        ...req.body,
        school: req.query.school
      }
      const data = await service.createLibrary(dataAdd)
      return res.status(200).json(data)
    } catch (error: any) {
      return res.status(500).json({ error: error.message, success: false })
    }
  })
