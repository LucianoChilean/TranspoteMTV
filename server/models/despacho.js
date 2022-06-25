const { DataTypes } = require('sequelize');
const db            = require('../db/connection');


const Despacho = db.define('Despacho',{
    despacho_id:{
        type : DataTypes.INTEGER.UNSIGNED,
        primaryKey : true,
        autoIncrement : true
    },
    numero:{
        type: DataTypes.INTEGER,
    },
    descripcion:{
        type: DataTypes.TEXT
    },
    nave:{
        type: DataTypes.STRING
    }/*,
    puerto_id:{
        type : DataTypes.INTEGER.UNSIGNED
    },
    conductor_id:{
        type : DataTypes.INTEGER.UNSIGNED
    },
    cliente_id:{
        type: DataTypes.INTEGER.UNSIGNED
    }*/
});

module.exports = Despacho; 