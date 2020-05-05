import IHashProvider from '../models/IHashProvider';

export default class FakeHashProvider implements IHashProvider {
  public async generateHash(paylaod: string): Promise<string> {
    return paylaod;
  }

  public async compareHash(paylaod: string, hashed: string): Promise<boolean> {
    return paylaod === hashed;
  }
}
