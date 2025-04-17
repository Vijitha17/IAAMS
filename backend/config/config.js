require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'viji@2003@E21CS056',
    database: process.env.DB_NAME || 'iaams',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql'
  }
};
