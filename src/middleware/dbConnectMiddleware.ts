import { dbConnect } from '@/lib/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'

export const dbConnectMiddleware = async (req: NextApiRequest, res: NextApiResponse, next: any) => {
  await dbConnect()
  next()
}
