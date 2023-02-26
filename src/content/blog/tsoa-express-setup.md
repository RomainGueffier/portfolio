---
title: A Tsoa & Swagger integration with ExpressJS
image: /express-laptop.jpg
alt: Photo de Clément Hélardot sur Unsplash
publishedAt: 2023-02-24T19:00:00Z
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

You can with the power of `Typescript` and `Tsoa`. While relying on the _experimental_ **Typescript Decorators** feature (at the start of 2023), `Tsoa` is more than ready to use.

The big plus of this library is its very short and elegant syntax. It's not just about generating some routes, but also a SwaggerUI endpoint and having parameters and body types safety! All of this infered from your app types. 😃

Let's start right now with a simple example!

> ℹ️ Note that throughout this tutorial, I will use `ESModules`, `pnpm` and `node 18`, but feel free to adapt to your personal cup of tee 🍵

## Installation

Init a `Express` + `Typescript` project:

```bash
pnpm init
pnpm add express swagger-ui-express tsoa
pnpm add -D typescript @types/express @types/node nodemon ts-node  @types/swagger-ui-express
```

You should have a `package.json` file looking like this:

```json
{
  "name": "tsoa-express",
  "version": "1.0.0",
  "description": "tsoa express example",
  "type": "module",
  "main": "src/server.ts",
  "scripts": {
    "dev": "tsoa spec-and-routes && nodemon --watch src --ext ts --exec \"ts-node --esm src/server.ts\"",
    "build": "tsoa spec-and-routes && tsc src/server.ts",
    "start": "node dist/src/server.js"
  },
  "dependencies": {
    "@tsoa/runtime": "^5.0.0",
    "express": "^4.18.2",
    "swagger-ui-express": "^4.6.0",
    "tsoa": "^5.0.0"
  },
  "devDependencies": {
    "@types/swagger-ui-express": "^4.1.3",
    "@types/express": "^4.17.17",
    "@types/node": "^18.11.19",
    "nodemon": "^2.0.20",
    "ts-node": "^10.9.1",
    "typescript": "^4.9.5"
  }
}
```

Next create a `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "nodenext",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "experimentalDecorators": true, // Needed for Tsoa
    "emitDecoratorMetadata": true, // Needed for Tsoa
    "outDir": "dist",
    "resolveJsonModule": true,
    "baseUrl": "."
  },
  "exclude": ["node_modules"],
  "include": ["src", ".tsoa"]
}
```

## Code boilerplate

Create a `src` folder and a `app.ts` and `server.ts` files in root directory.

Initialize your `Express` app with `Swagger` and `Tsoa`:

```ts
// app.ts
import express, { json, urlencoded } from 'express'
// Generated routes & Swagger definitions by Tsoa CLI
import { RegisterRoutes } from '../.tsoa/routes.js'
import swaggerUI from 'swagger-ui-express'
import swaggerJson from '../.tsoa/swagger.json' assert { type: 'json' }

export const app = express()

// Use body parser to read sent json payloads
app.use(
  urlencoded({
    extended: true,
  })
)
app.use(json())

// Load tsoa generated routes into express app
RegisterRoutes(app)

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJson))

app.get('/', (_, res) => {
  res.json('Welcome to your Tsoa-Express-Swagger app')
})
```

```ts
// server.ts
import { app } from './app.js'

const port = process.env.PORT || 3000

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
)
```

Then create a `.tsoa.json` file in root directory and paste this code inside:

```json
// .tsoa.json
{
  "entryFile": "src/server.ts",
  "noImplicitAdditionalProperties": "throw-on-extras",
  "controllerPathGlobs": ["src/controllers/*Controller.ts"],
  "spec": {
    "outputDirectory": ".tsoa",
    "specVersion": 3
  },
  "routes": {
    "routesDir": ".tsoa",
    "esm": true
  }
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
import { Route, Tag, Get, Controller } from 'tsoa'

@Route('posts')
@Tag('Posts')
export class PostsController extends Controller {
  /**
   * User route description
   */
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

After you server restart, you should see your `/docs` entrypoint showing a new route called `Posts` with a `GET` method and types definitions infered from your function return type! Pretty easy right? 😎

Now you can add the database / ORM that you want. Check [Sources](#sources) for more examples!

Thanks for reading !

## Sources

- [CodeSandbox](https://codesandbox.io/p/github/RomainGueffier/tsoa-express-example/main)
- [Github](https://github.com/RomainGueffier/tsoa-express-example)

## Docs

- [Tsoa Documentation](https://tsoa-community.github.io/docs/)
