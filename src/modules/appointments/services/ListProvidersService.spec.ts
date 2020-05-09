import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUserRepository;
let listProvidersService: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    listProvidersService = new ListProvidersService(fakeUsersRepository);
  });
  it('should be able to list providers', async () => {
    const loggedUser = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@exemple.com',
      password: '123123',
    });
    const user2 = await fakeUsersRepository.create({
      name: 'Jhon tre',
      email: 'jhontre@exemple.com',
      password: '123123',
    });
    const user3 = await fakeUsersRepository.create({
      name: 'Jhon Qua',
      email: 'jhonqua@exemple.com',
      password: '123123',
    });

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user2, user3]);
  });
});
