const { DataTypes } = require('sequelize');
const db            = require('../db/connection');


const Puerto = db.define('Puerto',{
    puerto_id:{
        type : DataTypes.INTEGER.UNSIGNED,
        primaryKey : true,
        autoIncrement : true
    },
    nombre:{
        type: DataTypes.STRING(150)
    },
    region_id:{
        type: DataTypes.INTEGER.UNSIGNED
    },
    comuna_id:{
        type: DataTypes.INTEGER.UNSIGNED
    }
});
 
module.exports = Puerto;