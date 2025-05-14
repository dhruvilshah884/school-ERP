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
    const classes = await classServiceInstance.getAllClasses(req.query.school as string)
    res.status(200).json({
      success: true,
      data: classes
    })
  })
  .post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    const data = req.body
    const schoolId = req.query.school as string
    const classData = {
      ...data,
      school: schoolId
    }
    const createdClass = await classServiceInstance.createClass(classData)
    res.status(201).json({
      success: true,
      data: createdClass
    })
  })
