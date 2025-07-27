# [Cities](https://github.com/ItsAUniqueName/cities)
##### Author: Csille Milán

This repository contains my demo project. The application implements the basic CRUD functionalities on cities.

## Features

- List counties
- List cities
- Create new city
- Update cities
- Delete cities

The application uses a minimalist design based on bootstrap and scss.

## Technologies

The project uses the following technologies, frameworks:

- Angular - For frontend. Communicates with backend through Http requests.
- Node.js + Express - For backend logic and REST API functionalities.
- Prisma - For database connection.
- PostgreSQL - As database.
- Docker - To run the database.

## Frontend
The frotend is a straight-forward Angular application. The single page in the application is the homepage. Besides it, every other smaller component is stored in the components folder.
The services, which enable communication with the backend API are in the services folder.

##Backend
The backend is a REST API. The main files are:
- prisma/migrations - Stores the database migrations. this way our database will always be up to date.
- prisma/schema.prisma - Prisma uses this file to generate the classes needed to handle the database.
- prisma.ts - Contains the logic needed to use Prisma.
- logger.ts - A designated logger class. This way logging settings are easy to change.
- server.ts - This file contains the Express server with all of it's settings.
- index.ts - The main file of the application. Starts the database connection and the listening of the server.
- router/*.ts - these files describe the existing endpoints.
- controller/*.ts - These files contain the business logic for every endpoint.

## Requirements
To use the applications, you need the followings to be installed:
- Npm v11.4.x
- Angular v20.x.x
- NodeJs v22.17.x
- Docker or PostgreSQL v16

## Installation
#### To start the application follow these instructions:

##### Install dependencies
This will create the node_modules folders for the applications.

```sh
cd backend
npm install
```

```sh
cd frontend
npm install
```

##### Start PostgreSQL.
Here we will use the docker image forr this.
```sh
docker build -t my-postgres-image .
docker run -d -p 5432:5432 --name my-postgres-container my-postgres-image
```

Set up your .env file!

```sh
DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/mydatabase?schema=public"
```

##### Start your backend!
You can build it and run your build or you can use nodemon.
Using nodemon:
```sh
cd backend
npm run dev
```

If you want to build the application separately:
```sh
cd backend
npm run build
npm run start
```

##### Start your frontend!
First set up your environment files in src/environments if needed!

```sh
cd fron/src/environments
apiUrl: "http://localhost:3000/"
```

You can serve the application or build it. For local runnung and developement, i recommend use the serve command.

```sh
cd fron
ng serve
```

If you want to deploy the code onto a server, use build!

```sh
cd fron
ng build
```

If everithing went as expected, the application should be available for you on localhost:4200 or on the port you specified in the angular.json file.

