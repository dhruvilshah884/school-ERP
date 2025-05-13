import { CommonModal } from './CommonModel'

export interface ITask extends CommonModal {
  title: string
  description: string
  status: string
  due_date: Date
  assigned_to: string
  assigned_by: string
  priority: string
  comments: string
}
