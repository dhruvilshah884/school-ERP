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
      const { id } = req.query
      const data = await service.getLibraryById(id as string)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  })
  .put(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const { id } = req.query
      const data = await service.updateLibrary(id as string, req.body)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  })
  .delete(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const { id } = req.query
      const data = await service.deleteLibrary(id as string)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  })
