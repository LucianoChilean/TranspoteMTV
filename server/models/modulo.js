const { DataTypes } = require('sequelize');
const db            = require('../db/connection');


const Modulo = db.define('Modulo',{
    modulo_id:{
        type : DataTypes.INTEGER.UNSIGNED,
        primaryKey : true,
        autoIncrement : true
    },
    nombre:{
        type: DataTypes.STRING
    },
    descripcion:{
        type: DataTypes.TEXT
    }
});

module.exports = Modulo; 