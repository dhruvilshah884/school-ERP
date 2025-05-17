import { NextApiRequestWithUser } from '@/interface/NextApiRequestWithUser'
import { NextApiResponse } from 'next'
import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import { authCheckMiddleware } from '@/middleware/authCheckMiddleware'
import { facultyAttendance } from '@/services/facultyAttendance.service'
import nextConnect from 'next-connect'

const service = new facultyAttendance()

export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)
  .get(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const result = await service.getFacultAttendance(req.query.id as string)
      res.status(200).json({
        message: 'Faculty Attendance Fetched Successfully',
        data: result
      })
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      })
    }
  })
  .put(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const data = {
        ...req.body,
        teacher_id: req.teacher._id,
        school: req.query.school
      }
      const result = await service.updateFacultyAttendance(req.query.id as string, data)
      res.status(200).json({
        message: 'Faculty Attendance Updated Successfully',
        data: result
      })
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      })
    }
  })
  .delete(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const result = await service.deleteFacultyAttendance(req.query.id as string)
      res.status(200).json({
        message: 'Faculty Attendance Deleted Successfully',
        data: result
      })
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      })
    }
  })
