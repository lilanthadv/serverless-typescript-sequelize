import { Handler } from "aws-lambda";
import { BookService } from "./services/book.service";

const bookService = new BookService();

export const createBook: Handler = async (event) => {
  const body = JSON.parse(event.body);

  const book = await bookService.addBook(body.name, body.author);
  
  return {
    statusCode: 201,
    body: JSON.stringify(
      {
        message: "Success",
        book
      }
    ),
  };
};

export const getBooks: Handler = async (event) => {
  const books = await bookService.getBooks();
  
  return {
    statusCode: 200,
    body: JSON.stringify(books),
  };
};
