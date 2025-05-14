import { NextApiRequestWithUser } from '@/interface/NextApiRequestWithUser'
import { NextApiResponse } from 'next'
import { StudentTransportationService } from '@/services/studentTransportation.service'
import { authCheckMiddleware } from '@/middleware/authCheckMiddleware'
import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import nextConnect from 'next-connect'

const service = new StudentTransportationService()
export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)
  .post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const data = {
        ...req.body,
        school: req.query.school
      }
      const studentTransportation = await service.createStudentTransportation(data)
      res.status(201).json(studentTransportation)
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  })
  .get(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const studentTransportations = await service.getAllStudentTransportations(req.query.school as string)
      res.status(200).json(studentTransportations)
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  })
