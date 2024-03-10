import { Book } from "../models/book.model";
import { BookRepository } from "../repositories/book.repository";
import CustomValidationError from "../utils/CustomValidationError";

export class BookService {
  private bookRepository: BookRepository;

  constructor() {
    this.bookRepository = new BookRepository();
  }

  async addBook(name: string, author: string): Promise<Book> {
    return this.bookRepository.createBook(name, author);
  }

  async getBooks(): Promise<Book[]> {
    return this.bookRepository.getBooks();
  }

  async getBook(id: number): Promise<Book> {
    const book = await this.bookRepository.getBook(id);
    if(!book){
      throw new CustomValidationError("id", `Book does not exists`);
    }
    return book;
  }

}
