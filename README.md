# Express Starter

This starter repo will be used for building applications using React, Material-UI, React-Router, Node, & Express.js.

## Getting started

The project is broken down into a client and server folder.

### Database

This project is designed to be used with postgres utilizing Sequelize (as its ORM).
In order to set up your database please create a .env file with DB_USERNAME=`your username`
DB_PASSWORD=`your password`

If you would like to use a a separate SQL database please also include DIALECT=`database type` in your .env file. Review the official [sequelize documentation](https://sequelize.org/) for more information

There is a default database of `hatchways-messenger` for use in development environments and a default of `hatchways-messenger-test` for testing environments. It is expected in production environments that the database will be provided from the environment and a default is not set.

To insert the tables into your database run `yarn migrate` or `npm run migrate`. Please note your database will need to be setup prior to inserting tables.

To insert seed data into your tables run `yarn seed` or `npm run seed`

### Server Variables

Please see [config/config.js](server/config/config.js) for a full list of variables which can be configured for your repo.
