const Sequelize = require('sequelize');

const db = new Sequelize(
    'mtv_ctc',
    'root',
    '',{
    host: 'localhost',
    dialect: 'mysql',
    //loggging: false
})

module.exports = db;