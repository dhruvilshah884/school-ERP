import { NextApiRequestWithUser } from '@/interface/NextApiRequestWithUser'
import { NextApiResponse } from 'next'
import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import { authCheckMiddleware } from '@/middleware/authCheckMiddleware'
import { CertificateService } from '@/services/certificate.service'
import nextConnect from 'next-connect'

const service = new CertificateService()

export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)
  .get(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const { schoolId } = req.query
      const certificates = await service.findOne(schoolId as string)
      res.status(200).json(certificates)
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  })
  .put(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const { schoolId } = req.query
      const certificate = await service.update(schoolId as string, req.body)
      res.status(200).json(certificate)
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  })
  .delete(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const { schoolId } = req.query
      const certificate = await service.delete(schoolId as string)
      res.status(200).json(certificate)
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  })
