import { hash, compare } from 'bcryptjs';
import IHashProvider from '../models/IHashProvider';

export default class BCryptHashProvider implements IHashProvider {
  public async generateHash(paylaod: string): Promise<string> {
    return hash(paylaod, 8);
  }

  public async compareHash(paylaod: string, hashed: string): Promise<boolean> {
    return compare(paylaod, hashed);
  }
}
