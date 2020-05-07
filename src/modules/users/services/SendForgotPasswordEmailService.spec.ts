// import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordMail', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeUsersRepository = new FakeUserRepository();
    const fakeMailProvider = new FakeMailProvider();
    const sendForgotPasswordMail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
    );

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
});
