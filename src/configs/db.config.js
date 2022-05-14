const { Sequelize, QueryTypes } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DATABASE_NAME, process.env.DB_USERNAME, `${process.env.PASSWORD}`, {
    host: process.env.HOST,
    port: process.env.DB_PORT,
    dialect: 'mariadb',/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    logging: (...msg) => console.log(msg)
});



module.exports = {
    sequelize, QueryTypes
}