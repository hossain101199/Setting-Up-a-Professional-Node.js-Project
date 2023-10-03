# Setting Up a Professional Node.js Project

## Part 4: Adding Logging and Error Handling to our Node.js Project

In this section, we'll enhance our Node.js project by adding logging capabilities using Winston and implementing error handling with custom error classes and global error middleware.

### Install Winston and Winston Daily Rotate File

let's install the Winston logger and the Winston Daily Rotate File transport for log rotation:

```bash
npm i winston
npm install winston-daily-rotate-file
```

### Create a Logging Module

create a folder named `shared` within the `src` folder and a file named `logger.ts` inside it Add the following content:

```typescript
import path from 'path';
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

// Custom Log Format
const myFormat = format.printf(({ level, message, timestamp }) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${date.toDateString()} ${hour}:${minutes}:${seconds} => ${level} => ${message}`;
});

const infoLogger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), myFormat),

  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'successes',
        '%DATE%-success.log',
      ),
      datePattern: 'HH-DD-MM-YYYY',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

const errorLogger = createLogger({
  level: 'error',
  format: format.combine(format.timestamp(), myFormat),

  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        '%DATE%-error.log',
      ),
      datePattern: 'HH-DD-MM-YYYY',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

export { errorLogger, infoLogger };
```

This code creates two Winston loggers, one for info messages and one for error messages. Both loggers will log to the console and to a daily rotating file. The info logger will log to the `successes` directory, and the error logger will log to the `errors` directory. Both loggers will also archive zipped files and keep a maximum of 14 days of logs.

### Create an Error Handling Module

let's create an error handling module. Create a folder named `errors` within the `src` folder and a file named `ApiError.ts` inside it. Add the following content:

```typescript
class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string | undefined, stack = '') {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
```

This custom error class, `ApiError`, extends the built-in `Error` class. It allows you to specify an HTTP status code and a message for the error.

### Create an Error Interface

In the `src` folder, create a folder named `interfaces` and a file named `error.ts` inside it. Add the following content:

```typescript
type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export default IGenericErrorMessage;
```

This code defines an interface, `IGenericErrorMessage`, for generic error messages.

### Create Global Error Middleware

Now, let's create global error handling middleware. In the `src` folder, create a folder named `app`, and within it, create a folder named `middlewares`. Create a file named `globalErrorHandler.ts` inside the `middlewares` folder and add the following content:

```typescript
import { ErrorRequestHandler } from 'express';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import IGenericErrorMessage from '../../interfaces/error';
import { errorLogger } from '../../shared/logger';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
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
```

This code defines a global error handler middleware that catches and logs errors. It also sends an appropriate HTTP response with error details to the client.

### Implement Global Error Middleware

In the `app.ts` file, add the global error handler middleware to your Express application:

```typescript
import globalErrorHandler from './app/middlewares/globalErrorHandler';

// ...

// Global error handler
app.use(globalErrorHandler);
```

This ensures that any unhandled errors in your application will be caught and processed by the global error handler.

### Update the Server Entry Point

In the `server.ts` file, update the code to handle uncaught exceptions, unhandled promise rejections, and SIGTERM signals gracefully:

```typescript
import { Server } from 'http';
import app from './app';
import config from './config/index';
import { errorLogger, infoLogger } from './shared/logger';

process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});

let server: Server;

async function main() {
  try {
    server = app.listen(config.port, () => {
      infoLogger.info(
        `app listening on port ${config.port} | http://localhost:${config.port}`,
      );
    });
  } catch (error) {
    errorLogger.error(error);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

process.on('SIGTERM', () => {
  infoLogger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
```

This code adds event listeners to handle uncaught exceptions, unhandled promise rejections, and SIGTERM signals gracefully. It ensures that the application logs errors and exits gracefully when necessary.

With these additions, our Node.js project is now equipped with robust logging using Winston and comprehensive error handling. we can log various types of messages, handle errors gracefully, and maintain clean and organized code. These improvements will help us build a more reliable and maintainable application.
