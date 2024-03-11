import { IBookCreate, IBookUpdate } from "../interfaces/book.interface";
import { Book } from "../models/book.model";
import { BaseRepository } from "./base.repository";

export class BookRepository extends BaseRepository<Book> {
  constructor() {
    super(Book);
  }

  async createBook(data: IBookCreate): Promise<Book> {
    return this.create(data);
  }

  async getBooks(): Promise<Book[]> {
    return this.findAll();
  }

  async getBook(id: number): Promise<Book | null> {
    return this.findById(id);
  }

  async updateBook(
    id: number,
    data: IBookUpdate
  ): Promise<[affectedCount: number]> {
    return this.update(id, data);
  }

  async deleteBook(id: number): Promise<number> {
    return this.delete(id);
  }
}
