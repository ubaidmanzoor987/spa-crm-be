![Nest](assets/logo.png)

### Technologies implemented:

-   [sequelize-typescript](https://github.com/RobinBuschmann/sequelize-typescript) (ORM) + [MS SQL](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
-   [JWT](https://jwt.io/)
-   [Swagger](https://swagger.io/)

## Prerequisites

-   [Node.js](https://nodejs.org/) (>= 10.8.0)
-   [npm](https://www.npmjs.com/) (>= 6.5.0)

## Installation

```bash
$ npm install
```

## Setting up the database for development and test

MSSQL database connection options are shown in the following table:

| Option   | Development
| -------- | ----------- 
| Host     | 202.59.90.27
| Port     | 1433     
| Username | admin
| Password | admin1234
| Database | spa-crm


Go to .env and update the variables For Example

DATABASE_HOST=db.host.com



## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# e2e tests
$ npm run test
```

## Other commands

```bash
# formatting code
$ npm run format

# run linter
$ npm run lint


## Run production configuration

Copy .env.production.example to .env and update the variables For Example

```
NODE_ENV=production \
DATABASE_HOST=db.host.com \
DATABASE_PORT=5432 \
DATABASE_USER=user \
DATABASE_PASSWORD=pass \
DATABASE_DATABASE=database \
JWT_PRIVATE_KEY=jwtPrivateKey \
ts-node -r tsconfig-paths/register src/main.ts
```

## Swagger API docs

Swagger docs will be available at localhost:8000/documentation
