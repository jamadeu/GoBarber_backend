import AppError from '@shared/errors/AppError';

import FakeAppointments from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointments;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointments();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      user_id: 'user_id',
      provider_id: '123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  it('should not be able to create two appointment on the same schedule', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: 'user_id',
      provider_id: '123123',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: 'user_id',
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
