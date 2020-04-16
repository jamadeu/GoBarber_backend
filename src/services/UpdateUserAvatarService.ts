import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/User';

import uploadConig from '../config/upload';

interface RequestDTO {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: RequestDTO): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new Error('Only authenticated users can change avatar.');
    }

    if (user.avatar) {
      const userAvatarFielPath = path.join(uploadConig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFielPath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFielPath);
      }
    }

    user.avatar = avatarFilename;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;