import { getMongoRepository, MongoRepository } from 'typeorm';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import INotificatonCreateDTO from '@modules/notifications/dtos/INotificatonCreateDTO';
import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';

class NotificationsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    recipient_id,
  }: INotificatonCreateDTO): Promise<Notification> {
    const notification = this.ormRepository.create({ content, recipient_id });

    await this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;
