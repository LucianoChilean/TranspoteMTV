const { DataTypes } = require('sequelize');
const db            = require('../db/connection');


const Direccion = db.define('Direccion',{
    direccion_id:{
        type : DataTypes.INTEGER.UNSIGNED,
        primaryKey : true,
        autoIncrement : true
    },
    direccion:{
        type: DataTypes.STRING
    },
    descripcion:{
        type: DataTypes.TEXT
    },
    cliente_id:{
        type : DataTypes.INTEGER.UNSIGNED
    },
    region_id:{
        type : DataTypes.INTEGER.UNSIGNED
    },
    comuna_id:{
        type : DataTypes.INTEGER.UNSIGNED
    }
});

module.exports = Direccion; 