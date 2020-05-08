import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUserRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });
  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@exemple.com',
      password: '123123',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile).toHaveProperty('id');
    expect(profile.name).toBe('Jhon Doe');
    expect(profile.email).toBe('jhondoe@exemple.com');
  });

  it('should not be able to show the profile with a invalid id', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
