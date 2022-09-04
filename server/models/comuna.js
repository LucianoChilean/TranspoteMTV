const { DataTypes } = require('sequelize');
const db            = require('../db/connection');


const Comuna = db.define('Comuna',{
    comuna_id:{
        type : DataTypes.INTEGER.UNSIGNED,
        primaryKey : true,
        autoIncrement : true
    },
    nombre:{
        type: DataTypes.STRING,
    },
    region_id:{
        type: DataTypes.INTEGER.UNSIGNED,
    }
});

module.exports = Comuna; 