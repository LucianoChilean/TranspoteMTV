const Sequelize = require('sequelize');

const db = new Sequelize(
    'mtv_ctc',
    'admin',
    '123',{
    host: 'localhost',
    dialect: 'mysql',
    //loggging: false
})

module.exports = db;