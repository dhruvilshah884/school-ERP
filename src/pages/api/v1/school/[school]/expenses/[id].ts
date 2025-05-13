import { NextApiRequestWithUser } from '@/interface/NextApiRequestWithUser'
import { NextApiResponse } from 'next'
import { ExpenseService } from '@/services/expensed.service'
import { authCheckMiddleware } from '@/middleware/authCheckMiddleware'
import { dbConnectMiddleware } from '@/middleware/dbConnectMiddleware'
import nextConnect from 'next-connect'
import { NEXT_RSC_UNION_QUERY } from 'next/dist/client/components/app-router-headers'

const service = new ExpenseService()
export default nextConnect()
  .use(dbConnectMiddleware)
  .use(authCheckMiddleware)

  .get(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const expense = await service.getExpenseById(req.query.id as string)
      res.status(200).json({
        status: 'success',
        data: expense
      })
    } catch (error: any) {
      res.status(500).json({
        status: 'error',
        message: error.message
      })
    }
  })
  .put(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const expenseData = req.body
      const expense = await service.updateExpense(req.query.id as string, expenseData)
      res.status(200).json({
        status: 'success',
        data: expense
      })
    } catch (error: any) {
      res.status(500).json({
        status: 'error',
        message: error.message
      })
    }
  })
  .delete(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const expense = await service.deleteExpense(req.query.id as string)
      res.status(200).json({
        status: 'success',
        data: expense
      })
    } catch (error: any) {
      res.status(500).json({
        status: 'error',
        message: error.message
      })
    }
  })
