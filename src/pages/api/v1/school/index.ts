import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from 'next'
import { SchoolService } from "@/services/school.service";
import { dbConnectMiddleware } from "@/middleware/dbConnectMiddleware";

const service = new SchoolService()

export default nextConnect()
  .use(dbConnectMiddleware)
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const schools = await service.getSchools()
      res.status(200).json({ success: true, data: schools })
    } catch (error:any) {
      console.error('error in get school -> ', error)
      res.status(500).json({ success: false, message: error.message })
    }
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const school = await service.createSchool(req.body)
      res.status(201).json({ success: true, data: school })
    } catch (error:any) {
      console.error('error in create school -> ', error)
      res.status(500).json({ success: false, message: error.message })
    }
  })

