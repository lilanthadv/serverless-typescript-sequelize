import { Handler } from "aws-lambda";
import { BookService } from "../services/book.service";
import { BookValidation } from "../validations/book.validation";
import { IBookCreate, IBookUpdate } from "../interfaces/book.interface";
import { BaseController } from "./base.controller";

export class BookController extends BaseController{
  private bookService: BookService;
  private bookValidation: BookValidation;

  constructor() {
    super();
    this.bookService = new BookService();
    this.bookValidation = new BookValidation();
  }

  public createBook: Handler = async (event, _context, callback) => {
    try {
      const body: IBookCreate = JSON.parse(event.body);
      const { error } = this.bookValidation.addBookValidation(body);
      if (error) {
        return this.errorHandler.handleValidationError(error, callback);
      }
      const book = await this.bookService.addBook({
        name: body.name,
        author: body.author,
      });
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

  public updateBook: Handler = async (event, _context, callback) => {
    try {
      const id: number = Number(event.pathParameters.id);
      const body: IBookUpdate = JSON.parse(event.body);

      const { error } = this.bookValidation.updateBookValidation({
        id,
        ...body,
      });
      if (error) {
        return this.errorHandler.handleValidationError(error, callback);
      }

      const book = await this.bookService.updateBook(id, body);
      return this.successHandler.successResponse(book, 200);
    } catch (error: any) {
      return this.errorHandler.handleError(error, callback);
    }
  };

  public deleteBook: Handler = async (event, _context, callback) => {
    try {
      const id: number = Number(event.pathParameters.id);
      const book = await this.bookService.deleteBook(id);
      return this.successHandler.successResponse(book, 200);
    } catch (error: any) {
      return this.errorHandler.handleError(error, callback);
    }
  };
}
