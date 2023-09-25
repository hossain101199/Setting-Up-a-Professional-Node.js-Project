# Setting Up a Professional Node.js Project with TypeScript, ESLint, Prettier, and Husky.

When starting a new Node.js project, it's crucial to establish a robust development environment that encourages clean code, ensures code quality, and facilitates collaboration among team members. In this guide, we'll walk you through setting up a professional Node.js project using TypeScript, ESLint, Prettier, and Husky. These tools will help you maintain code consistency, catch errors early, and streamline your development process.

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

To exclude specific files from ESLint checks, create an `.eslintignore` file in the project root:

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
