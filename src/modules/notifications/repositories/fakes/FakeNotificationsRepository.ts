import { ObjectID } from 'mongodb';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import INotificatonCreateDTO from '@modules/notifications/dtos/INotificatonCreateDTO';
import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';

class NotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async create({
    content,
    recipient_id,
  }: INotificatonCreateDTO): Promise<Notification> {
    const notification = new Notification();
    Object.assign(notification, { id: new ObjectID(), content, recipient_id });
    this.notifications.push(notification);
    return notification;
  }
}
export default NotificationsRepository;
