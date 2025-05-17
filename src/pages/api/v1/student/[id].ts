import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from 'next'
import { StudentService } from "@/services/student.service";
import { dbConnectMiddleware } from "@/middleware/dbConnectMiddleware";

const service = new StudentService()
export default nextConnect()
    .use(dbConnectMiddleware)
    .get(async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const { id } = req.query
            const student = await service.getAllDetailsByStudentId(id as string)
            res.status(200).json({ success: true, data: student })
        } catch (error:any) {
            console.error('error in get student -> ', error)
            res.status(500).json({ success: false, message: error.message })
        }
    })