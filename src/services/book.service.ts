import { Book } from '../models/book.model';
import { BookRepository } from '../repositories/book.repository';

export class BookService {
  private bookRepository = new BookRepository();

  async addBook(name: string, author: string): Promise<Book> {
    return this.bookRepository.createBook(name, author);
  }

  async getBooks(): Promise<Book[]> {
    return this.bookRepository.getBooks();
  }
}