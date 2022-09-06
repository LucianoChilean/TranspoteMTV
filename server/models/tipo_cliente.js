const { DataTypes } = require('sequelize');
const db            = require('../db/connection');


const Tipocliente = db.define('Tipocliente',{
    tipo_cliente_id:{
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

module.exports = Tipocliente; 