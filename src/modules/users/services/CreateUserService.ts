import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User);

    const userExists = await usersRepository.findOne({
      where: { email },
    });

    if (userExists) {
      throw new AppError('Email already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;