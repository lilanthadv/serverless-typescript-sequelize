import { Handler } from "aws-lambda";
import { BookService } from "../services/book.service";
import { ErrorHandler } from "../utils/ErrorHandler";
import { SuccessHandler } from "../utils/SuccessHandler";
import { BookValidation } from "../validations/book.validation";

export class BookController {
  private bookService: BookService;
  private bookValidation: BookValidation;
  private errorHandler: ErrorHandler;
  private successHandler: SuccessHandler;

  constructor() {
    this.bookService = new BookService();
    this.bookValidation = new BookValidation();
    this.errorHandler = new ErrorHandler();
    this.successHandler = new SuccessHandler();
  }

  public createBook: Handler = async (event, _context, callback) => {
    try {
      const body = JSON.parse(event.body);
      const { error } = this.bookValidation.addBookValidation(body);
      if (error) {
        return this.errorHandler.handleValidationError(error, callback);
      }
      const book = await this.bookService.addBook(body.name, body.author);
      return this.successHandler.successResponse(book, 201);
    } catch (error: any) {
      return this.errorHandler.handleError(error, callback);
    }
  };

  public getBooks: Handler = async (_event, _context, callback) => {
    try {
      const books = await this.bookService.getBooks();
      return this.successHandler.successResponse(books, 200);
    } catch (error: any) {
      return this.errorHandler.handleError(error, callback);
    }
  };

  public getBook: Handler = async (event, _context, callback) => {
    try {
      const id: number = Number(event.pathParameters.id);
      const book = await this.bookService.getBook(id);
      return this.successHandler.successResponse(book, 200);
    } catch (error: any) {
      return this.errorHandler.handleError(error, callback);
    }
  };
}
