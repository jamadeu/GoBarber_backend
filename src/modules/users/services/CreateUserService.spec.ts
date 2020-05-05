import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUserRepository();
    const createAppointment = new CreateUserService(fakeUsersRepository);

    const user = await createAppointment.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@gmail.com',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('jhondoe@gmail.com');
  });

  it('should not be able to create two users with the same email', async () => {
    const fakeUsersRepository = new FakeUserRepository();
    const createAppointment = new CreateUserService(fakeUsersRepository);

    const user = await createAppointment.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@gmail.com',
      password: '123123',
    });

    expect(
      createAppointment.execute({
        name: 'Jhon Doe',
        email: 'jhondoe@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
