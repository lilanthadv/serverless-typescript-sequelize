import { Handler } from "aws-lambda";
import { BookService } from "../services/book.service";
import { ErrorHandler } from "../utils/ErrorHandler";
import { SuccessHandler } from "../utils/SuccessHandler";

export class BookController {
  private bookService: BookService;
  private errorHandler: ErrorHandler;
  private successHandler: SuccessHandler;

  constructor() {
    this.bookService = new BookService();
    this.errorHandler = new ErrorHandler();
    this.successHandler = new SuccessHandler();
  }

  public createBook: Handler = async (event, _context, callback) => {
    try {
      const body = JSON.parse(event.body);
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
