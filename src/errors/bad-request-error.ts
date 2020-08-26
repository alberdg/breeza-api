import { CustomError } from './custom-error';

/**
 * Class representing a bad request error
 * @class
 */
export class BadRequestError extends CustomError {
  reason = '';
  statusCode = 400;
  constructor (private msg: string) {
    super();
    this.reason = this.msg;
    // Only because we are extending a built in class
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  /**
   * Converts errors to the expected format
   * @function
   * @returns { [Object] } messages Error messages 
   */
  serializeErrors () {
    return [
        { message: this.reason }
    ];
  }
}
