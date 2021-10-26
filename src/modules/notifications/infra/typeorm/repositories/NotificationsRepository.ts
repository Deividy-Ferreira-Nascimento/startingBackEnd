import { getMongoRepository, MongoRepository } from 'typeorm';

import Notification from '../schemas/Notification';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

class NotificationsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const Notification = this.ormRepository.create({ content, recipient_id });

    await this.ormRepository.save(Notification);

    return Notification;
  }
}

export default NotificationsRepository;
