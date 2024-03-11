import { Handler } from "aws-lambda";
import { BookController } from "../controllers/book.controller";

const bookController = new BookController();

export const createBook: Handler = async (event, context, callback) => {
  return bookController.createBook(event, context, callback);
};

export const getBooks: Handler = async (event, context, callback) => {
  return bookController.getBooks(event, context, callback);
};

export const getBook: Handler = async (event, context, callback) => {
  return bookController.getBook(event, context, callback);
};

export const updateBook: Handler = async (event, context, callback) => {
  return bookController.updateBook(event, context, callback);
};

export const deleteBook: Handler = async (event, context, callback) => {
  return bookController.deleteBook(event, context, callback);
};
