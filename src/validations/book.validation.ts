import Joi from 'joi';

export class BookValidation {
  public addBookValidation(data: any) {
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
}