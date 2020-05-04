import path from 'path';
import fs from 'fs';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import uploadConig from '@config/upload';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      const userAvatarFielPath = path.join(uploadConig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFielPath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFielPath);
      }
    }

    user.avatar = avatarFilename;

    await this.usersRepository.update(user);

    return user;
  }
}

export default UpdateUserAvatarService;
