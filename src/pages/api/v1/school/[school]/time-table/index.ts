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
      const timeTables = await service.getAllTimetables()
      res.status(200).json(timeTables)
    } catch (err: any) {
      res.status(500).json({ message: err.message })
    }
  })
  .post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const data = { ...req.body, school: req.user.school }
      const timeTable = await service.createTimetable(data)
      res.status(201).json(timeTable)
    } catch (err: any) {
      res.status(500).json({ message: err.message })
    }
  })