import { models } from '@/models'

export class ExpenseService {
  private expenseModel = models.Expenses
  public async createExpense(expenseData: any) {
    try {
      const expense = await this.expenseModel.create(expenseData)
      return expense
    } catch (error) {
      throw error
    }
  }
  public async getExpenses(schoolId: string) {
    try {
      const expenses = await this.expenseModel
        .find({ school: schoolId })
        .populate('addedBy')
        .populate('faculty_id')
        .populate('school')
      return expenses
    } catch (error) {
      throw error
    }
  }
  public async getExpenseById(expenseId: string) {
    try {
      const expense = await this.expenseModel
        .findById(expenseId)
        .populate('addedBy')
        .populate('faculty_id')
        .populate('school')
      return expense
    } catch (error) {
      throw error
    }
  }
  public async updateExpense(expenseId: string, expenseData: any) {
    try {
      const expense = await this.expenseModel.findByIdAndUpdate(expenseId, expenseData, { new: true })
      return expense
    } catch (error) {
      throw error
    }
  }
  public async deleteExpense(expenseId: string) {
    try {
      const expense = await this.expenseModel.findByIdAndUpdate(expenseId, { isDeleted: true }, { new: true })
      return expense
    } catch (error) {
      throw error
    }
  }
}
