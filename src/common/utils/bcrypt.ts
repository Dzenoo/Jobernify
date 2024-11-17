import * as bcrypt from 'bcrypt';

export async function generatePasswordHash(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export async function verifyPassword(
  inputPassword: string,
  storedPassword: string,
): Promise<boolean> {
  const isMatched = await bcrypt.compare(inputPassword, storedPassword);
  return isMatched;
}
