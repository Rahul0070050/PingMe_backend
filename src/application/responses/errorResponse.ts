export default class ErrorResponse extends Error {
  statusCode: number;
  details: string | null;
  constructor(
    message: string,
    statusCode: number = 500,
    details: string | null = null
  ) {
    super(message);
    this.name = "ErrorResponse";
    this.statusCode = statusCode;
    this.details = details;
  }

  toJSON() {
    return {
      success: false,
      message: this.message,
      statusCode: this.statusCode,
      ...(this.details && { details: this.details }),
    };
  }
}
