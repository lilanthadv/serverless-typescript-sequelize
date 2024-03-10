import { Book } from '../models/book.model';

export class BookRepository {
  async createBook(name: string, author: string): Promise<Book> {
    return Book.create({ name, author });
  }
  async getBooks(): Promise<Book[]> {
    return Book.findAll();
  }
}