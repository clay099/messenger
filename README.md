# Instant Messenger

This repository contains a front-end client and backend api to provide an instant messenger application.

## Getting started

The project is broken down into a client and server directory.

---

## Client

This directory holds the front-end application which is built out to include:

-   React for front-end library for user interfaces (functional components),
-   Socket.io for real-time communication with API via WebSockets
-   React-Router for Client-Side Routing,
-   Material-UI for pre-built components & styling of the application
-   Formik & yup for form submission & form validation
-   TypeScript for strictly typed
-   Husky & lint-staged to fail fast
-   Jest & react-testing-library for testing framework & assertions

### Usage

Once the repository is downloaded cd into the `client` directory

Run `yarn install` or `npm install` to install all required packages

In order to get the sockets to work add an environment variable called "REACT_APP_API_URL". This variable should correspond with the backend API address.

To start the project in dev mode use `yarn start` or `npm run start`

To run the test scripts use `yarn test` or `npm run test`

---

## Server

This directory holds the backend api which has been built out to include:

-   Express for flexible Node.js web application framework
-   Socket.io for real-time communication with front-end via WebSockets
-   Postgres for relational database management
-   Sequelize for Node.js ORM used with Postgres
-   JsonwebToken for signed transfer of authentication information
-   Cookie-parser for sending authentication data over HTTP-only cookies
-   Bcrypt for encryption of data in database
-   Mocha & Chai for test framework & assertions

### Usage

Once the repository is downloaded cd into the `server` directory

The second step is to ensure the Database has been set up and is connected to the project [see Database section](#database) for detailed further information.

Run `yarn install` or `npm install` to install all required packages

To start the project in dev mode use `yarn dev` or `npm run dev`

To start the project in debug mode use `yarn debug` or `npm run debug`

To run the test scripts use `yarn test` or `npm run test`

### Database

This project is designed to be used with postgres utilizing Sequelize (as its ORM).
In order to set up your database please create a .env file with DB_USERNAME=`your username`
DB_PASSWORD=`your password`

If you would like to use a a separate SQL database please also include DIALECT=`database type` in your .env file. Review the official [sequelize documentation](https://sequelize.org/) for more information

There is a default database of `instant-messenger` for use in development environments and a default of `instant-messenger-test` for testing environments. It is expected in production environments that the database will be provided from the environment and a default is not set.

To insert the tables into your database run `yarn migrate` or `npm run migrate`. Please note your database will need to be setup prior to inserting tables.

To insert seed data into your tables run `yarn seed` or `npm run seed`

### Server Variables

Please see [config/config.js](server/config/config.js) for a full list of variables which can be configured for your repo.
