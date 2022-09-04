const { DataTypes } = require('sequelize');
const db            = require('../db/connection');


const Ingresos = db.define('Ingresos',{
    ingresos_id:{
        type : DataTypes.INTEGER.UNSIGNED,
        primaryKey : true,
        autoIncrement : true
    },
    rut_ingreso:{
        type: DataTypes.STRING,
    },
    puerto_id:{
        type: DataTypes.INTEGER.UNSIGNED,
    }
});

module.exports = Ingresos; 