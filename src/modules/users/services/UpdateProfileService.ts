import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/Providers/HashProvider/models/IHashProvider';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    if (password && !old_password) {
      throw new AppError(
        'To change the password it is necessary to inform the old_password',
        401,
      );
    }
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found');
    }

    const checkEmailIsInUse = await this.usersRepository.findByEmail(email);
    if (checkEmailIsInUse && checkEmailIsInUse.id !== user.id) {
      throw new AppError('Email already in use.');
    }

    if (password && old_password) {
      const validateOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );
      if (!validateOldPassword) {
        throw new AppError('Invalid password', 401);
      }
      user.password = await this.hashProvider.generateHash(password);
    }

    user.name = name;
    user.email = email;
    return this.usersRepository.update(user);
  }
}

export default UpdateProfileService;
