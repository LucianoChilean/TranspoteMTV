const { DataTypes } = require('sequelize');
const db            = require('../db/connection');


const Tarifadespacho = db.define('Tarifadespacho',{
    Tarifadespacho_id:{
        type : DataTypes.INTEGER.UNSIGNED,
        primaryKey : true,
        autoIncrement : true
    },
    despacho_id:{
        type: DataTypes.INTEGER.UNSIGNED
    },
    tarifa_id:{
        type: DataTypes.INTEGER.UNSIGNED
    }

});
 
module.exports = Tarifadespacho;