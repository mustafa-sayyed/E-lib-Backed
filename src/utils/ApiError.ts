class ApiError extends Error {
  statusCode;
  message;
  success;

  constructor(statusCode: number = 500, message: string = "Internal Server Error") {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.success = false;
    Error.captureStackTrace(this, this.constructor);
  }

}

export default ApiError;
