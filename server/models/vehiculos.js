const { DataTypes } = require('sequelize');
const db            = require('../db/connection');


const Vehiculos = db.define('Vehiculos',{
    vehiculos_id:{
        type : DataTypes.INTEGER.UNSIGNED,
        primaryKey : true,
        autoIncrement : true
    },
    patente:{
        type: DataTypes.STRING(255)
    },
    rampla_id:{
        type : DataTypes.INTEGER.UNSIGNED
    },
    descripcion:{
        type: DataTypes.TEXT
    },
    tipo_vehiculo:{
        type : DataTypes.STRING(255)
    },
    conductor_id:{
        type : DataTypes.INTEGER.UNSIGNED
    },
    propietario_rut:{
        type : DataTypes.STRING(15)
    },
    fecha:{
        type: DataTypes.DATE
    },
    chasis:{
        type : DataTypes.STRING(255)
    },
    motor:{
        type : DataTypes.STRING(255)
    },
    imagen:{
        type : DataTypes.STRING(255)
    }
});

module.exports = Vehiculos; 