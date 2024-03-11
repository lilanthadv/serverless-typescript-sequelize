import { ErrorHandler } from "../utils/ErrorHandler";
import { SuccessHandler } from "../utils/SuccessHandler";

export class BaseController {
  protected errorHandler: ErrorHandler;
  protected successHandler: SuccessHandler;

  constructor() {
    this.errorHandler = new ErrorHandler();
    this.successHandler = new SuccessHandler();
  }
}
