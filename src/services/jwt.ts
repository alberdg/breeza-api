import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { Password } from './password';

export class JWT {

  /**
   * Signs JSON Web token for the given user and stores it in the session
   * @function
   * @param { Request } req Express request
   * @param { Object } user User object
   */
  static sign (req: Request, user: any) {
    const { _id, email } = user;
    // Generate json web token
    const userJwt = jwt.sign({
      id: _id,
      email
    }, process.env.JWT_KEY!);

    req.session = {
      jwt: userJwt
    };
  }

  /**
   * Verifies given password vs stored password
   * @function
   * @param { String } storedPassword Stored and hashed password
   * @param { String } suppliedPassword Password supplied by user
   * @returns { Boolean } valid Valid password flag
   */
  static async verify (storedPassword: string, suppliedPassword: string) {
    const passwordsMatch = await Password.compare(
      storedPassword,
      suppliedPassword
    );
    if (!passwordsMatch) {
      throw new Error('Invalid credentials');
    }
    return true;
  }

}
