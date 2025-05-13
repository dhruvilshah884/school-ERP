import { NextApiRequestWithUser } from '@/interface/NextApiRequestWithUser'
import { NextApiResponse } from 'next'
import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import { authCheckMiddleware } from '@/middleware/authCheckMiddleware'
import { TaskService } from '@/services/task.service'
import nextConnect from 'next-connect'

const service = new TaskService()

export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)
  .get(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const { school } = req.query
      const tasks = await service.findAll(school as string)
      res.status(200).json({ tasks })
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  })
  .post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const data = {
        ...req.body,
        school: req.query.school,
        assigned_by: req.user._id
      }
      const task = await service.create(data)
      res.status(201).json({ task })
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  })
