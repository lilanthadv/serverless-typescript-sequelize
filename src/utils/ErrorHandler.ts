import { Callback } from "aws-lambda";

export class ErrorHandler {
  handleError(error: any, callback: Callback) {
    if (error.message === "CustomValidationError") {
      const { errorField, errorMessage } = error;
      const response = {
        statusCode: 400,
        body: JSON.stringify({
          statusCode: 400,
          error: "true",
          data: {
            [`${errorField}`]: [errorMessage],
          },
        }),
      };

      callback(null, response);
    } else {
      const response = {
        statusCode: 500,
        body: JSON.stringify({
          statusCode: 500,
          error: "true",
          message: "Internal Server Error",
        }),
      };

      callback(null, response);
    }
  }
}