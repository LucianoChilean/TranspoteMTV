const { DataTypes } = require('sequelize');
const db            = require('../db/connection');


const Region = db.define('Region',{
    region_id:{
        type : DataTypes.INTEGER.UNSIGNED,
        primaryKey : true,
        autoIncrement : true
    },
    nombre:{
        type: DataTypes.STRING,
    }
});

module.exports = Region; 