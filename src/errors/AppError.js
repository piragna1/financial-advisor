export class AppError extends Error {
  constructor(errorObj = {}, details = '') {
  if (typeof errorObj !== 'object' || errorObj === null) {
    throw new TypeError("AppError expects an object with code, message, and status");
  }
  const { code = '', message = '', status = '' } = errorObj;
  super(message);
  Object.assign(this, { code, status, details });
}

}
