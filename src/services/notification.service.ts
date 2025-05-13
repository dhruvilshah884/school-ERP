import { models } from '@/models'

export class NotificationService {
  public async createNotification(data: any): Promise<any> {
    const newNotification = await models.Notification.create(data)
    return newNotification
  }
  public async getNotifications(userRole: any): Promise<any> {
    const filter: any = {
      isDeleted: false,
      target_role: { $in: ['ALL', userRole] }
    }
    const notifications = await models.Notification.find(filter).sort({ createdAt: -1 }).populate('issued_by')
    return notifications
  }
  public async getNotificationById(id: string): Promise<any> {
    const notification = await models.Notification.findById(id)
    return notification
  }
  public async updateNotification(id: string, data: any): Promise<any> {
    const updatedNotification = await models.Notification.findByIdAndUpdate(id, data, { new: true })
    return updatedNotification
  }
  public async deleteNotification(id: string): Promise<any> {
    const deletedNotification = await models.Notification.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
    return deletedNotification
  }
}
