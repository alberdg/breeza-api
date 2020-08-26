import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

/**
 * Class responsible to hash passwords and to compare
 * hashed ones with the ones supplied by the user
 * @function
 */
export class Password {
  /**
   * Hashes the given string
   * @function
   * @param { String } password Password string to hash
   * @returns { String } password Password hashed
   */
  static async toHash (password: string) {
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString('hex')}.${salt}`;
  }

  /**
   * Compares two passwords by hashing the supplied one
   * @function
   * @param { String } storedPassword Hashed password
   * @param { String } suppliedPassword Password supplied by user
   * @returns { Boolean } result Valid password flag
   */
  static async compare (storedPassword: string, suppliedPassword: string) {
    const [ hashedPassword, salt ] = storedPassword.split('.');
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
    return buf.toString('hex') === hashedPassword;
  }
}
