import { IBookCreate, IBookUpdate } from "../interfaces/book.interface";
import { Book } from "../models/book.model";
import { BookRepository } from "../repositories/book.repository";
import CustomValidationError from "../utils/CustomValidationError";

export class BookService {
  private bookRepository: BookRepository;

  constructor() {
    this.bookRepository = new BookRepository();
  }

  async addBook(data: IBookCreate): Promise<Book> {
    return this.bookRepository.createBook(data);
  }

  async getBooks(): Promise<Book[]> {
    return this.bookRepository.getBooks();
  }

  async getBook(id: number): Promise<Book> {
    const book = await this.bookRepository.getBook(id);
    if (!book) {
      throw new CustomValidationError("id", "Book does not exists");
    }
    return book;
  }

  async updateBook(id: number, data: IBookUpdate): Promise<Book | null> {
    const book = await this.bookRepository.getBook(id);
    if (!book) {
      throw new CustomValidationError("id", "Book does not exists");
    }
    await this.bookRepository.updateBook(id, data);
    return await this.bookRepository.getBook(id);
  }

  async deleteBook(id: number): Promise<number> {
    const book = await this.bookRepository.delete(id);
    if (!book) {
      throw new CustomValidationError("id", "Book does not exists");
    }
    return book;
  }
}
