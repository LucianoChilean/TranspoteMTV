const { DataTypes } = require('sequelize');
const db            = require('../db/connection');


const tarifadetalle = db.define('tarifadetalle',{
    tarifadetalle_id:{
        type : DataTypes.INTEGER.UNSIGNED,
        primaryKey : true,
        autoIncrement : true
    },
    detalle_id:{
        type: DataTypes.INTEGER.UNSIGNED
    },
    tarifa_id:{
        type: DataTypes.INTEGER.UNSIGNED
    }

});
 
module.exports = tarifadetalle;