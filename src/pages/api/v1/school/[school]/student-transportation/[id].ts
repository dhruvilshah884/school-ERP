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
  .get(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const studentTransportation = await service.getStudentTransportationById(req.query.id as string)
      res.status(200).json(studentTransportation)
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  })
  .put(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const studentTransportation = await service.updateStudentTransportation(req.query.id as string, req.body)
      res.status(200).json(studentTransportation)
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  })
  .delete(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const studentTransportation = await service.deleteStudentTransportation(req.query.id as string)
      res.status(200).json(studentTransportation)
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  })
