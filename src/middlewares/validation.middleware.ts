import { Request, Response, NextFunction } from 'express';
import { ObjectSchema, ValidationError } from 'joi';
import { BadRequestException } from '../errors/customErrors';

const validateRequest = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try{
      const { error } = schema.validate(req.body);
      if (error) {
        const errorMessage = error.details[0].message;
        throw new BadRequestException(errorMessage);
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default validateRequest;
