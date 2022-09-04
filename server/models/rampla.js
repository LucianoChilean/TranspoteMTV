const { DataTypes } = require('sequelize');
const db            = require('../db/connection');


const Rampla = db.define('Rampla',{
    rampla_id:{
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

module.exports = Rampla; 