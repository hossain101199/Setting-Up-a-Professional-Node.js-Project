import { ErrorRequestHandler } from 'express';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import IGenericErrorMessage from '../../interfaces/error';
import { errorLogger } from '../../shared/logger';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // eslint-disable-next-line no-unused-expressions
  config.env === 'development'
    ? console.log(
        `===============================>>>>>>>>>>>>>>>>> globalErrorHandler ~~`,
        error,
      )
    : errorLogger.error(
        `===============================>>>>>>>>>>>>>>>>> globalErrorHandler ~~`,
        error,
      );

  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorMessages: IGenericErrorMessage[] = [];

  if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env === 'development' && error?.stack,
  });
};

export default globalErrorHandler;
