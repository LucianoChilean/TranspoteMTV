const { DataTypes } = require('sequelize');
const db            = require('../db/connection');


const Asignacion = db.define('Asignacion',{
    asignacion_id:{
        type : DataTypes.INTEGER.UNSIGNED,
        primaryKey : true,
        autoIncrement : true
    },
    rol_id:{
        type : DataTypes.INTEGER.UNSIGNED
    },
    modulo_id:{
        type : DataTypes.INTEGER.UNSIGNED
    }
});

module.exports = Asignacion; 