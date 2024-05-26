import { customAlphabet } from 'nanoid';

export function genUUID() {
  const nanoid = customAlphabet(
    '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    11
  );
  const uuid = nanoid();

  return uuid;
}
