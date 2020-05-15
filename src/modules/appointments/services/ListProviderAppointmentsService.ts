import { inject, injectable } from 'tsyringe';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
    day,
  }: IRequest): Promise<Appointment[]> {
    const caheData = await this.cacheProvider.recover('asdfas');
    console.log(caheData);
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      { day, month, year, provider_id },
    );
    await this.cacheProvider.save('asdfas', 'zsdf');
    return appointments;
  }
}

export default ListProviderAppointmentsService;
