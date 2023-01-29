---
title: A Tsoa & Swagger integration with ExpressJS
image: https://picsum.photos/1000/400
publishedAt: 2023-01-29T19:38:00Z
description: Would you like to generate your OpenAPI schema from your code without writing long json or yaml declarations files?
tags:
  - tsoa
  - swagger
  - express
  - setup
  - api
  - typescript
  - node
---

# A Tsoa & Swagger integration with ExpressJS

Would you like to generate your `Swagger UI` and `OpenAPI` specs right from the code without rewriting your schema in a long `yaml` or `json` declaration file?

You can with the power of `Typescript` and `Tsoa`. While still _experimental_ at the start of 2023 (not for too long), `Tsoa` will take leverage of `decorators` to make the hard work for you.

Even greater, the syntax is short and easy to read! 😃

Let's start right now!

## Installation

Init a `Express` + `Typescript` project:

```bash
pnpm init
pnpm add express
pnpm add -D typescript @types/express @types/node nodemon ts-node tsoa swagger-ui-express
```

You should have a `package.json` file looking like this:

```json
{
  "name": "express-ts-tsoa",
  "type": "module",
  "main": "index.ts",
  "scripts": {
    "dev": "nodemon --watch src --ext ts --exec \"ts-node index.ts\"",
    "build": "tsc"
  },
  "devDependencies": {
    "@types/node": "^18.11.18",
    "@types/express": "^6.4.6",
    "tsoa": "^8.32.0",
    "ts-node": "^8.32.0",
    "nodemon": "^8.32.0",
    "swagger-ui-express": "^0.8.0",
    "typescript": "^4.9.4"
  },
  "dependencies": {
    "express": "^0.7.12"
  }
}
```

> ℹ️ Note that I use `ESModules` and `node 18` for this example

Create a `.tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "experimentalDecorators": true
  },
  "exclude": ["node_modules", "dist"],
  "include": ["src", "index.ts"]
}
```

## Code boilerplate

Create a `src` folder and a `index.ts` file in root directory.

Initialize a basic `Express` app:

```ts
// index.ts
import express, { type Request, type Response } from 'express'

const app = express()
const port = 8000

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript + Tsoa Server')
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
```

Then create a `.tsoa.json` file in root directory and paste this code inside:

```json
// .tsoa.json
{
  "controllersGlobPattern": ["./src/controller/*Controller.ts"],
  "routes": {}
}
```

Now you can try out your express app:

```bash
pnpm dev
```

In `/docs` route you should see an empty `Swagger` page. Next step will be adding routes to our API!

## First route

Create a new controller file and paste this code inside.

```ts
// ./src/controllers/PostsController.ts
import { Controller } from 'tsoa'

@Route('posts')
@Tag('Posts')
export class PostsController extends Controller {
  @Get()
  async findMany() {
    return [
      {
        _id: 1,
        title: 'lorem ipsum',
        description: 'lorem ipsum again',
        content: 'a very long lorem ipsum text...',
        slug: '/lorem-ipsum',
        // etc.
      },
    ]
  }
}
```

After you server restart, you should see your `/docs` entrypoint showing a new route called `Posts` with a `GET` method and types definitions from your function return type! Pretty easy right? 😎

Now let's continue by adding a real database and ORM!

## Sources

- [Tsoa Documentation](https://tsoa-community.github.io/docs/)
