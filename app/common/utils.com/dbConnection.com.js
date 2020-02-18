const Sequelize = require('sequelize');


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {

    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_CONNECTION,
    logging: false,
});



sequelize.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
})
.catch(err => {
    throw new Error(`Unable to connect to the database: ${err}`);
})

module.exports = sequelize;