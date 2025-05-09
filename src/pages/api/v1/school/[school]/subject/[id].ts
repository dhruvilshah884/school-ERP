import { NextApiRequestWithUser } from '@/interface/NextApiRequestWithUser'
import { NextApiResponse } from 'next'
import { SubjectService } from '@/services/subject.service'
import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import { authCheckMiddleware } from '@/middleware/authCheckMiddleware'
import nextConnect from 'next-connect'

const service = new SubjectService()
export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)
  .get(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const subject = await service.getSubjectById(req.query.id as string)
      res.status(200).json(subject)
    } catch (err: any) {
      res.status(500).json({ message: err.message })
    }
  })
  .put(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const subject = await service.updateSubject(req.query.id as string, req.body)
      res.status(200).json(subject)
    } catch (err: any) {
      res.status(500).json({ message: err.message })
    }
  })
  .delete(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      await service.deleteSubject(req.query.id as string)
      res.status(200).json({ message: 'Subject deleted successfully' })
    } catch (err: any) {
      res.status(500).json({ message: err.message })
    }
  })
