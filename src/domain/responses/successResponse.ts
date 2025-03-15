export default class SuccessResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: string | null;
  constructor(message: string, data: any | null = null, statusCode = 200) {
    this.success = true;
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }

  toJSON() {
    return {
      success: this.success,
      message: this.message,
      statusCode: this.statusCode,
      ...(this.data && { data: this.data }),
    };
  }
}
