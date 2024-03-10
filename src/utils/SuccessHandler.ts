export class SuccessHandler {
  public successResponse<T>(
    data: T,
    statusCode: number
  ): any {
    return {
      statusCode,
      body: JSON.stringify({
        statusCode,
        error: "false",
        data,
      }),
    };
  }
}
