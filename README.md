# Setting Up a Professional Node.js Project.

# TypeScript, ESLint, Prettier, and Husky

When starting a new Node.js project, it's crucial to establish a robust development environment that encourages clean code, ensures code quality, and facilitates collaboration among team members. In this guide, I'll walk you through setting up a professional Node.js project using TypeScript, ESLint, Prettier, and Husky. These tools will help you maintain code consistency, catch errors early, and streamline your development process.

## Part 1: Project Initialization and Dependencies

### Create Project Structure

Let's begin by creating the project structure. Open your terminal and execute the following commands:

```bash
mkdir my-nodejs-project
cd my-nodejs-project
code .
```

This will create a new folder for your project, navigate into it, and open Visual Studio Code.

### Initialize the Project

To initialize your Node.js project, run the following command in the terminal:

```bash
npm init
```

This command will prompt you to provide information about your project, such as its name, version, description, entry point, and more. You can either fill in the details or simply press Enter to accept the defaults.

### Install TypeScript

Next, let's install TypeScript as a development dependency:

```bash
npm install typescript --save-dev
```

### Generate TypeScript Configuration

Generate a TypeScript configuration file by running:

```bash
npx tsc --init
```

This will create a tsconfig.json file in your project's root directory.

### Configure tsconfig.json

Open the `tsconfig.json` file and modify it as follows:

```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist"
    // ...
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

These settings specify that your source code is located in the `src` folder and compiled output should be placed in the `dist` folder.

### Install dotenv

Install the `dotenv` package to manage environment variables:

```bash
npm install dotenv
```

### Create Environment Variables

Create a `.env` file in the project's root directory and add the following content:

```env
NODE_ENV=development
PORT=8000
```

This file will store your environment-specific configuration.

### Create .gitignore

To keep unnecessary files out of your Git repository, create a `.gitignore` file and add the following content:

```gitignore
node_modules
.env
```

### Install Express and CORS

Now, let's set up the core of our application with Express and enable CORS for handling cross-origin requests:

```bash
npm install express
npm install cors
```

### Project Folder Structure

Create the project's folder structure:

```bash
mkdir src
```

Inside the `src` folder, create two files: `app.t`s and `server.ts`.

### Configure Environment Variables

Create a `config` folder within the `src` folder, and inside it, create an `index.ts` file with the following content:

```typescript
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
};
```

To resolve the error related to `path`, install `@types/node`:

```bash
npm i --save-dev @types/node
```

### Create Express Application

In `app.ts`, set up your Express application:

```typescript
import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
```

To resolve TypeScript errors related to `express`, install `@types/express` and `@types/cors`:

```bash
npm i --save-dev @types/express @types/cors
```

### Set Up Server Entry Point

In `server.ts`, create the server entry point:

```typescript
import app from './app';
import config from './config/index';

const main = async () => {
  try {
    app.listen(config.port, () => {
      console.log(`app listening on port ${config.port}`);
    });
    // Your server logic goes here
  } catch (error) {
    console.log(error);
  }
};

main();
```

### Install ts-node-dev

Install `ts-node-dev` as a development dependency:

```bash
npm i ts-node-dev --save-dev
```

### Update package.json Scripts

In your `package.json` file, add the following scripts:

```json
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "start": "node dist/server.js",
  "build": "tsc",
  // ...
},
```

Now, you can start your server in development mode by running:

```bash
npm run dev
```

If everything is set up correctly, you should see "App listening on port 8000" in the console.

## Part 2: Setting Up ESLint and Prettier

### Install ESLint and Prettier

Let's set up ESLint and Prettier to ensure code consistency and formatting:

```bash
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
npm install --save-dev prettier
npm install --save-dev eslint-config-prettier
```

Make sure you have installed the ESLint and Prettier extensions in Visual Studio Code.

### Configure Prettier

Create a `.prettierrc` file in the project root and add the following configuration:

```json
{
  "semi": true,
  "singleQuote": true,
  "arrowParens": "avoid"
}
```

### Configure ESLint

Create an ESLint configuration file `.eslintrc` in the project root:

```json
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "no-console": "warn",
    "no-undef": "error",
    "no-unused-expressions": "error",
    "no-unreachable": "error",
    "@typescript-eslint/consistent-type-definitions": ["error", "type"]
  },
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  }
}
```

### Create .eslintignore

To exclude specific files from ESLint checks, create a `.eslintignore` file in the project root:

```gitignore
node_modules
dist
.env
```

### Update package.json Scripts

In your `package.json` file, add linting and formatting scripts:

```json
"scripts": {
  // ...
  "lint": "eslint --ignore-path .eslintignore --ext .js,.ts .",
  "format": "prettier --ignore-path .gitignore --write \"**/*.+(js|ts|json)\"",
  "lint-prettier": "npm run lint && npm run format"
},
```

### Configure VS Code Settings

Create a `.vscode` folder in the project root and add a `settings.json` file with the following content:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  }
}
```

Now, your code will be automatically formatted and linted every time you save a file in Visual Studio Code.

## Part 3: Setting Up Husky for Git Hooks

### Initialize Git Repository

If you haven't already, initialize a Git repository in your project by running:

```bash
git init
```

### Install lint-staged

Install `lint-staged` to run linting and formatting checks on staged files:

```bash
npm install --save-dev lint-staged
```

### Configure lint-staged

Update the `lint-staged` section in your `package.json` to specify which files to check:

```json
{
  // ...
  "lint-staged": {
    "src/**/*.ts": "npm run lint-prettier"
  }
}
```

### Install Husky

Install Husky to set up Git hooks:

```bash
npm install husky --save-dev
```

### Install Husky Hooks

Install Husky hooks by running:

```bash
npx husky install
```

### Configure pre-commit Hook

Inside the `.husky` folder in your project root, open the `pre-commit` file and update it with the following content:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/\_/husky.sh"

npx lint-staged
```

Now, Husky will automatically run linting and formatting checks on your staged files before each commit.

Congratulations! You've successfully set up a professional Node.js project with TypeScript, ESLint, Prettier, and Husky. This well-structured development environment will help you write clean, error-free code and streamline your development workflow. You can now focus on building your application with confidence in your code quality and consistency.

# Winston, Winston Daily Rotate File, Error Handling.

In this section, we'll enhance our Node.js project by adding logging capabilities using Winston and implementing error handling with custom error classes and global error middleware.

## Part 4: Adding Logging and Error Handling to our Node.js Project

### Install Winston and Winston Daily Rotate File

let's install the Winston logger and the Winston Daily Rotate File transport for log rotation:

```bash
npm i winston
npm install winston-daily-rotate-file
```

### Create a Logging Module

create a folder named `shared` within the `src` folder and a file named `logger.ts` inside it.And add the following content:

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

let's create an error-handling module. Create a folder named `errors` within the `src` folder and a file named `ApiError.ts` inside it.And add the following content:

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

In the `src` folder, create a folder named `interfaces` and a file named `error.ts` inside it.And add the following content:

```typescript
type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export default IGenericErrorMessage;
```

This code defines an interface, `IGenericErrorMessage`, for generic error messages.

### Create Global Error Middleware

Now, let's create global error-handling middleware. In the `src` folder, create a folder named `app`, and within it, create a folder named `middlewares`. Create a file named `globalErrorHandler.ts` inside the `middlewares` folder and add the following content:

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

With these additions, your Node.js project is now equipped with robust logging using Winston and comprehensive error handling. You can log various types of messages, handle errors gracefully, and maintain clean and organized code. These improvements will help you build a more reliable and maintainable application.

## Part 5: Enhancing Your Node.js Project with Additional Modules and Utilities

In this section, I will further enhance your Node.js project by adding additional modules and utilities to improve its functionality and maintainability.

### Handling Not Found Routes

In your `app.ts` file, add a route handler to handle requests to non-existent routes. This will respond with a 404 Not Found status code and a JSON message indicating that the API endpoint was not found. Add the following code to your` app.ts` file:

```typescript
// Handle not found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Not Found',
    errorMessages: [{ path: req.originalUrl, message: 'API Not Found' }],
  });
});
```

This function will catch any requests that don't match any defined routes and respond with a 404 status.

### Create Shared Utility Functions

In the shared folder, create a file named sendResponse.ts with the following code:

```typescript
import { Response } from 'express';

type IApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data?: T | null;
};

const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
  const responseData: IApiResponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    meta: data.meta || null || undefined,
    data: data.data || null,
  };

  res.status(data.statusCode).json(responseData);
};

export default sendResponse;
```

This utility function, `sendResponse`, helps standardize the format of responses sent by your API, making it easier to handle success and error responses consistently.

### Implement a Catch-Async Wrapper

In the `shared` folder, create a file named `catchAsync.ts` with the following code:

```typescript
import { NextFunction, Request, RequestHandler, Response } from 'express';

const catchAsync =
  (fn: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export default catchAsync;
```

The `catchAsync` function is a wrapper that helps catch errors in Express route handlers. It allows you to write cleaner and more concise route handlers by automatically handling errors and passing them to the Express `next()` function.

### Create a Utility Function for Picking Object Properties

In the shared folder, create a file named pick.ts with the following code:

```typescript
const pick = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Partial<T> => {
  const finalObj: Partial<T> = {};
  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key];
    }
  }
  return finalObj;
};

export default pick;
```

The `pick` function allows you to select specific properties from an object and create a new object containing only those properties.

### Create a Pagination Options Interface

In the interfaces folder, create a file named pagination.ts with the following content:

```typescript
export type IPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};
```

This interface defines the options that can be used for pagination.

### Create a Pagination Helper

In the `src` folder, create a folder named he`lpers, and within it, create a file named `paginationHelper.ts` with the following content:

```typescript
import { IPaginationOptions } from '../interfaces/pagination';

type IOptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder?: 'asc' | 'desc';
};

const calculatePagination = (options: IPaginationOptions): IOptionsResult => {
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 10);
  const skip = (page - 1) * limit;

  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export const paginationHelpers = {
  calculatePagination,
};
```

This helper function, `calculatePagination`, calculates pagination options such as the page number, limit, skip, sorting criteria, and sorting order based on the provided options.

### Create Pagination Constants

In the `src` folder, create a folder named `constants`, and within it, create a file named `pagination.ts` with the following content:

```typescript
export const paginationFields = ['page', 'limit', 'sortBy', 'sortOrder'];
```

This constant array lists the fields that can be used for pagination in your application.

### Define Common Response Interfaces

In the `interfaces` folder, create a file named `common.ts` with the following content:

```typescript
import IGenericErrorMessage from './error';

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};
```

These interfaces define common response structures for your API, making it easier to maintain a consistent response format throughout your application.

### Organize Your Routes

In the `app` folder, create a folder named `routes`. Inside the `routes` folder, create an `index.ts` file to serve as the entry point for your routes. You can define and organize your routes within this structure.

```typescript
import express from 'express';

const routes = express.Router();

// const moduleRoutes = [
//   {
//     path: '/auth',
//     route: authRoutes,
//   },
// ];

// moduleRoutes.forEach(route => routes.use(route.path, route.route));

export default routes;
```

### Mount Routes in Your Express Application

In your `app.ts` file, mount your routes by importing and using the `router` from the routes folder:

```typescript
import routes from './app/routes';

// ...

// Application routes
app.use('/api/v1', routes);
```

This code specifies that all routes defined in the routes folder will be mounted under the '/api/v1' path in your Express application.

By following these steps, you've organized your project, added utility functions, and set up a structure to easily manage and expand your routes. This will make your Node.js project more maintainable as it grows.

## Here are the steps to use the setup from GitHub repository:

### Step 1: Clone the Repository

You can clone the repository to your local machine using the following command:

```bash
git clone https://github.com/hossain101199/Setting-Up-a-Professional-Node.js-Project.git
```

### Step 2: Navigate to the Project Directory

Enter the project directory using the cd command:

```bash
cd Setting-Up-a-Professional-Node.js-Project
```

### Step 3: Install Dependencies

To install the project dependencies, use the npm install command:

```bash
npm install
```

### Step 4: Set Up Environment Variables

Create a `.env` file in the project's root directory and add your environment-specific configuration. For example:

```env
NODE_ENV=development
PORT=8000
```

### Step 5: Run the Development Server

Start the development server using the following command:

```bash
npm run dev
```

If everything is set up correctly, you should see `"App listening on port 8000"` in the console.

### Step 6: Access the Application

You can access your Node.js application by opening a web browser and navigating to http://localhost:8000 (or the port you specified in your .env file).

Your project is now up and running with the provided setup. You can start building and expanding your Node.js application based on this foundation.

## Conclusion

Congratulations on successfully setting up the foundation of your professional Node.js project! You've covered essential aspects such as project structure, TypeScript integration, linting, formatting, logging, error handling, and Git hooks. This well-structured development environment will greatly assist you in building robust and maintainable Node.js applications.

## What's Next?

In the upcoming chapters, I will take the project to the next level by implementing user authentication. I will utilize popular technologies such as PostgreSQL, Prisma, JSON Web Tokens (JWT), and bcrypt to enhance the security and functionality of the application.

## Your Feedback Matters

Your opinion and feedback are essential to me! I value your input as it helps me improve and grow. If you have any questions, suggestions, or need further clarification on any part of this tutorial, please don't hesitate to reach out. Your feedback will help me tailor future content to your needs.

Thank you for joining me on this journey to build a professional Node.js project. I look forward to guiding you through the implementation of user authentication and helping you become a more skilled and confident developer. Stay tuned for the next chapters!

## Contact

If you have any questions or feedback, feel free to contact me:

- Mohammad Hossain - [Linkedin](https://www.linkedin.com/in/hossain1011/) - fshossain10@gmail.com

[![LinkedIn][linkedin-shield]][linkedin-url]

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/hossain1011/

**Happy coding! 🚀**
