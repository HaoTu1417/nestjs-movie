import * as bcrypt from 'bcrypt';

export class Hasher {
  getHashedString = async (password: string) => {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  };
  isMatch = async (plainTextPassword: string, hash: string) => {
    const result = await bcrypt.compare(plainTextPassword, hash);
    return result;
  };
}
