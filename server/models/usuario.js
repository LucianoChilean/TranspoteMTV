const { DataTypes } = require('sequelize');
const db            = require('../db/connection');


const Usuario = db.define('Usuario',{
    usuario_id:{
        type : DataTypes.INTEGER.UNSIGNED,
        primaryKey : true,
        autoIncrement : true
    },
    nombre:{
        type: DataTypes.STRING
    },
    paterno:{
        type: DataTypes.STRING
    },
    materno:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING,
        unique: true
    },
    password:{
        type: DataTypes.STRING
    },
    estado:{
        type: DataTypes.BOOLEAN
    },
    rol_id:{
        type : DataTypes.INTEGER.UNSIGNED
    }
});
 
module.exports = Usuario;