const { DataTypes } = require('sequelize');
const db            = require('../db/connection');


const Cliente = db.define('Cliente',{
    cliente_id:{
        type : DataTypes.INTEGER.UNSIGNED,
        primaryKey : true,
        autoIncrement : true
    },
    rut:{
        type: DataTypes.STRING,
        unique:true
    },
    nombre:{
        type: DataTypes.STRING
    },
    giro:{
        type: DataTypes.STRING
    },
    tipo_cliente_id:{
        type : DataTypes.INTEGER.UNSIGNED
    },
    direccion:{
        type: DataTypes.STRING
    },
    region_id:{
        type: DataTypes.INTEGER.UNSIGNED,
    },
    comuna_id:{
        type: DataTypes.INTEGER.UNSIGNED,
    },
    contacto:{
        type: DataTypes.STRING
    },
    mail:{
        type: DataTypes.STRING
    },
    fecha_emision:{
        type: DataTypes.DATE
    }
});

module.exports = Cliente; 