import { NextApiRequestWithUser } from '@/interface/NextApiRequestWithUser'
import { NextApiResponse } from 'next'
import { classService } from '@/services/class.service'
import { authCheckMiddleware } from '@/middleware/authCheckMiddleware'
import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import nextConnect from 'next-connect'

const classServiceInstance = new classService()
export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)
  .get(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    const id = req.query.id as string
    const classData = await classServiceInstance.getClassById(id)
    res.status(200).json({
      success: true,
      data: classData
    })
  })
  .put(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    const id = req.query.id as string
    const data = req.body
    const updatedClass = await classServiceInstance.updateClass(id, data)
    res.status(200).json({
      success: true,
      data: updatedClass
    })
  })
  .delete(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    const id = req.query.id as string
    const deletedClass = await classServiceInstance.deleteClass(id)
    res.status(200).json({
      success: true,
      data: deletedClass
    })
  })
