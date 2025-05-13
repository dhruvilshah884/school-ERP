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
      const { id } = req.query
      const task = await service.findOne(id as string)
      res.status(200).json({ task })
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  })
  .put(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const { id } = req.query
      const data = {
        ...req.body,
        school: req.query.school,
        assigned_by: req.user._id
      }
      const task = await service.update(id as string, data)
      res.status(200).json({ task })
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  })
  .delete(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const { id } = req.query
      const task = await service.delete(id as string)
      res.status(200).json({ task })
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  })
