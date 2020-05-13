import INotificatonCreateDTO from '@modules/notifications/dtos/INotificatonCreateDTO';
import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';

export default interface INotificatonsRepository {
  create(data: INotificatonCreateDTO): Promise<Notification>;
}
