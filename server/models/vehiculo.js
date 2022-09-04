const { DataTypes } = require('sequelize');
const db            = require('../db/connection');


const Vehiculo = db.define('Vehiculo',{
    vehiculo_id:{
        type : DataTypes.INTEGER.UNSIGNED,
        primaryKey : true,
        autoIncrement : true
    },
    patente:{
        type: DataTypes.STRING,
        unique:true
    },
    tipo_vehiculo:{
        type: DataTypes.STRING
    },
    descripcion:{
        type: DataTypes.STRING
    },
    year:{
        type: DataTypes.STRING
    },
    chasis:{
        type: DataTypes.STRING
    },
    motor:{
        type: DataTypes.STRING
    },
    imagen:{
        type: DataTypes.STRING
    },
    conductor_id:{
        type: DataTypes.INTEGER.UNSIGNED
    },
    propietario_id:{
        type : DataTypes.INTEGER.UNSIGNED
    },
    rampla_id:{
        type: DataTypes.INTEGER.UNSIGNED
    }
});

module.exports = Vehiculo; 