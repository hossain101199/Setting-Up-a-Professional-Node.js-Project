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
