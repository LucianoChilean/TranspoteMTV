const { DataTypes } = require('sequelize');
const db            = require('../db/connection');


const Tarifa = db.define('Tarifa',{
    tarifa_id:{
        type : DataTypes.INTEGER.UNSIGNED,
        primaryKey : true,
        autoIncrement : true
    },
    nombre:{
        type: DataTypes.STRING(255)
    },
    descripcion:{
        type: DataTypes.TEXT
    },
    regla:{
        type : DataTypes.STRING(255)
    },
    costo:{
        type: DataTypes.INTEGER
    },
    codigo:{
        type: DataTypes.STRING(155)
    },
    estado:{
        type: DataTypes.BOOLEAN
    },
    valor_interno:{
        type: DataTypes.INTEGER
    },
    valor_externo:{
        type: DataTypes.INTEGER
    }

});
 
module.exports = Tarifa;