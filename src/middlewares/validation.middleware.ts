import { Request, Response, NextFunction } from 'express';
import { ObjectSchema, ValidationError } from 'joi';

const validateReuest = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const errorMessage = error.details[0].message;
      return res.status(400).json({ error: errorMessage });
    }
    next();
  };
};

export default validateReuest;
