import { FindOptions } from "sequelize";
import { Book } from "../models/book.model";

export class BookRepository {
  async createBook(name: string, author: string): Promise<Book> {
    return Book.create({ name, author });
  }
  async getBooks(): Promise<Book[]> {
    return Book.findAll();
  }
  async getBook(id: number): Promise<Book | null> {
    const options: FindOptions = {
      where: { id },
    };
    return Book.findOne(options);
  }
}
