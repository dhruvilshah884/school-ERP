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
      const tasks = await service.getTaskByFaculty(id as string)
      res.status(200).json({ tasks })
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  })
