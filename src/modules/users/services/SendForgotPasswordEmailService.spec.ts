import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUserRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordMail: SendForgotPasswordEmailService;

describe('SendForgotPasswordMail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    sendForgotPasswordMail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });
  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123123',
    });

    await sendForgotPasswordMail.execute({
      email: 'jhondoe@example.com',
    });

    expect(sendMail).toBeCalled();
  });

  it('should not be able to recover password with wrong email', async () => {
    await expect(
      sendForgotPasswordMail.execute({
        email: 'wrong-email',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a token when for a forgot email', async () => {
    const generatedToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123123',
    });

    await sendForgotPasswordMail.execute({
      email: 'jhondoe@example.com',
    });

    expect(generatedToken).toHaveBeenCalledWith(user.id);
  });
});
