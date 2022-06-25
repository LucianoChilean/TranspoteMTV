const { DataTypes } = require('sequelize');
const db            = require('../db/connection');


const Detalle = db.define('Detalle',{
    detalle_id:{
        type : DataTypes.INTEGER.UNSIGNED,
        primaryKey : true,
        autoIncrement : true
    },
    descripcion:{
        type: DataTypes.STRING
    },
    tipo:{
        type: DataTypes.STRING
    },
    peso:{
        type: DataTypes.STRING
    },
    fecha_retiro:{
        type: DataTypes.DATE
    },
    tarjeton:{
        type: DataTypes.STRING
    },
    fecha_entrega:{
        type: DataTypes.DATE
    },
    devolucion:{
        type: DataTypes.STRING
    },
    estado:{
        type: DataTypes.STRING
    },
    despacho_id:{
        type : DataTypes.INTEGER.UNSIGNED
    }/*,
    puerto_id:{
        type : DataTypes.INTEGER.UNSIGNED
    },
    direccion_id:{
        type : DataTypes.INTEGER.UNSIGNED
    }*/
});

module.exports = Detalle; 