import Joi from "joi";
import { IBookCreate, IBookUpdate } from "../interfaces/book.interface";

export class BookValidation {
  public addBookValidation(data: IBookCreate) {
    const schema = Joi.object({
      name: Joi.string().min(3).required().messages({
        "any.required": `Name field is required `,
      }),
      author: Joi.string().required().messages({
        "any.required": `Author field is required `,
      }),
    });

    return schema.validate(data);
  }
  public updateBookValidation(data: { id: number } & IBookUpdate) {
    const schema = Joi.object({
      id: Joi.number().required().messages({
        "any.required": `Id field is required `,
      }),
      name: Joi.string().min(3).messages({
        "any.required": `Name field is required `,
      }),
      author: Joi.string().messages({
        "any.required": `Author field is required `,
      }),
    });

    return schema.validate(data);
  }
}
