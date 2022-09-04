const { DataTypes } = require('sequelize');
const db            = require('../db/connection');


const Conductor = db.define('conductor',{
    conductor_id:{
        type : DataTypes.INTEGER.UNSIGNED,
        primaryKey : true,
        autoIncrement : true
    },
    nombre:{
        type: DataTypes.STRING(255)
    },
    paterno:{
        type: DataTypes.STRING(255)
    },
    materno:{ 
        type: DataTypes.STRING(255)
    },
    rut:{
        type: DataTypes.STRING(15),
        unique:true
    },
    fono:{
        type: DataTypes.STRING(25)
    },
    email:{
        type: DataTypes.STRING(255),
        unique:true
    },
    tipo:{
        type: DataTypes.STRING(155)
    },
    giro:{
        type: DataTypes.STRING(255)
    },
    imagen:{
        type: DataTypes.STRING(255)
    },
    propietario_id:{
        type: DataTypes.INTEGER.UNSIGNED
    },
    ingreso_id:{
        type: DataTypes.INTEGER.UNSIGNED
    }

});
 
module.exports = Conductor;