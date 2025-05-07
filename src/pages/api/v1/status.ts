import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import type { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'

export default nextConnect()
  .use(dbConnectMiddleware)
  .get((req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json({ status: 'ok' })
  })
