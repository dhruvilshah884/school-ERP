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
      const subjects = await service.getAllSubjects()
      res.status(200).json(subjects)
    } catch (err: any) {
      res.status(500).json({ message: err.message })
    }
  })
  .post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const data = { ...req.body, school: req.user.school }
      const subject = await service.createSubject(data)
      res.status(201).json(subject)
    } catch (err: any) {
      res.status(500).json({ message: err.message })
    }
  })
