import { NextApiRequestWithUser } from '@/interface/NextApiRequestWithUser'
import { NextApiResponse } from 'next'
import { timetableService } from '@/services/timetable.service'
import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import { authCheckMiddleware } from '@/middleware/authCheckMiddleware'
import nextConnect from 'next-connect'

const service = new timetableService()
export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)
  .get(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const timeTable = await service.getTimetableById(req.query.id as string)
      res.status(200).json(timeTable)
    } catch (err: any) {
      res.status(500).json({ message: err.message })
    }
  })
  .put(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const timeTable = await service.updateTimetable(req.query.id as string, req.body)
      res.status(200).json(timeTable)
    } catch (err: any) {
      res.status(500).json({ message: err.message })
    }
  })
  .delete(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      await service.deleteTimetable(req.query.id as string)
      res.status(200).json({ message: 'TTimetable deleted successfully' })
    } catch (err: any) {
      res.status(500).json({ message: err.message })
    }
  })
