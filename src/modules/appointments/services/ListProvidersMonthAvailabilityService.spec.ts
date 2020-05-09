// import AppError from '@shared/errors/AppError';

// import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeAppointments from '../repositories/fakes/FakeAppointmentsRepository';
import ListProvidersMonthAvailabilityService from './ListProvidersMonthAvailabilityService';

let fakeAppointments: FakeAppointments;
// let fakeUserRepository: FakeUserRepository;
let listProvidersMonthAvailability: ListProvidersMonthAvailabilityService;

describe('ListProvidersMonthAvailability', () => {
  beforeEach(() => {
    // fakeUserRepository = new FakeUserRepository();
    fakeAppointments = new FakeAppointments();
    listProvidersMonthAvailability = new ListProvidersMonthAvailabilityService(
      fakeAppointments,
    );
  });
  it('should be able to list the month availability from provider', async () => {
    await fakeAppointments.create({
      provider_id: 'provider_id',
      date: new Date(2020, 3, 20, 8, 0, 0),
    });

    await fakeAppointments.create({
      provider_id: 'provider_id',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointments.create({
      provider_id: 'provider_id',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    await fakeAppointments.create({
      provider_id: 'provider_id',
      date: new Date(2020, 4, 21, 8, 0, 0),
    });

    const availability = await listProvidersMonthAvailability.execute({
      provider_id: 'provider_id',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: false },
        { day: 22, available: true },
      ]),
    );
  });
});
