import { Request, Response, RequestHandler, NextFunction } from 'express';
import { ZodError, ZodObject, ZodRawShape } from 'zod';
import { BadRequestException } from '../../exceptions';

export const validate = (
  schema: ZodObject<ZodRawShape>,
  source: 'body' | 'query' | 'params',
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req[source]);
      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        throw new BadRequestException(JSON.parse(error.message)[0].message);
      }

      throw error;
    }
  };
};

export const validateBody = (schema: ZodObject<ZodRawShape>): RequestHandler => {
  return validate(schema, 'body');
};

export const validateQuery = (schema: ZodObject<ZodRawShape>): RequestHandler => {
  return validate(schema, 'query');
};

export const validateParams = (schema: ZodObject<ZodRawShape>): RequestHandler => {
  return validate(schema, 'params');
};
