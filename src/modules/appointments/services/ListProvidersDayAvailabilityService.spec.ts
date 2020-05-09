import FakeAppointments from '../repositories/fakes/FakeAppointmentsRepository';
import ListProvidersDayAvailabilityService from './ListProvidersDayAvailabilityService';

let fakeAppointments: FakeAppointments;
let listProvidersDayAvailability: ListProvidersDayAvailabilityService;

describe('ListProvidersDayAvailability', () => {
  beforeEach(() => {
    fakeAppointments = new FakeAppointments();
    listProvidersDayAvailability = new ListProvidersDayAvailabilityService(
      fakeAppointments,
    );
  });
  it('should be able to list the day availability from provider', async () => {
    await fakeAppointments.create({
      provider_id: 'provider_id',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointments.create({
      provider_id: 'provider_id',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    const availability = await listProvidersDayAvailability.execute({
      provider_id: 'provider_id',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },
      ]),
    );
  });
});
