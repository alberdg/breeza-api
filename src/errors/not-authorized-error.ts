import { CustomError } from './custom-error';

/**
 * Class representing not authorized error
 * @function
 */
export class NotAuthorizedError extends CustomError {
  reason = '';
  statusCode = 401;
  constructor (private msg: string) {
    super();
    this.reason = this.msg;
    // Only because we are extending a built in class
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors () {
    return [
        { message: this.reason }
    ];
  }
}
