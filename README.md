## Description

This project implements a clients and products REST API with support to authentication and authorization.

## Installation

```bash
$ npm install
# or
$ yarn
```

Copy`.env.sample` to `.env`:

```bash
$ cp .env.sample .env
```

## Running the app

Start the database layer:

```bash
$ docker-compose up -d
```

After initializing the dabatase, start the app:

```bash
# development
$ npm run start
# or
$ yarn run start

# watch mode
$ npm run start:dev
# or
$ yarn run start:dev

# production mode
$ npm run start:prod
# or
$ yarn run start:prod
```

## Swagger

The documentation can be accessed going to http://localhost:3000/swagger/

Remember to get the Bearer Token with /auth/login endpoint and authenticate the swagger session in order to access `products` routes.

## First Run / Creating a User

Create a root user using swagger at [POST] /users route or run this command:

```bash
$ curl -X 'POST' \
  'http://localhost:3000/v1/users' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
		"name": "admin",
		"username": "admin",
		"email": "admin@admin.com",
		"password": "password"
	}'
```

## Test

```bash
# unit tests
$ npm run test
# or
$ yarn run test

# e2e tests
$ npm run test:e2e
# or
$ yarn run test:e2e

# test coverage
$ npm run test:cov
# or
$ yarn run test:cov
```
