const { DataTypes } = require('sequelize');
const db            = require('../db/connection');


const Rol = db.define('Rol',{
    rol_id:{
        type : DataTypes.INTEGER.UNSIGNED,
        primaryKey : true,
        autoIncrement : true
    },
    nombre:{
        type: DataTypes.STRING
    },
    descripcion:{
        type: DataTypes.STRING
    }
});

module.exports = Rol; 