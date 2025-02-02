import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import { HttpException } from '../../exceptions';
import logger from '../../logger/winston';

const ErrorHandler: ErrorRequestHandler = (
  error: HttpException,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  void _next;

  if (error.error) {
    logger.error({ message: error.message });
  }

  res.status(error.statusCode ?? 500).json({
    message: error.message,
    error: error.error ?? undefined,
  });
};

export default ErrorHandler;
