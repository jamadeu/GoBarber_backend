import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUserRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@gmail.com',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('jhondoe@gmail.com');
  });

  it('should not be able to create two users with the same email', async () => {
    const fakeUsersRepository = new FakeUserRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    await createUser.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@gmail.com',
      password: '123123',
    });

    expect(
      createUser.execute({
        name: 'Jhon Doe',
        email: 'jhondoe@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});