const { DataTypes } = require('sequelize');
const db            = require('../db/connection');


const Clientetarifa = db.define('Clientetarifa',{
    clientetarifa_id:{
        type : DataTypes.INTEGER.UNSIGNED,
        primaryKey : true,
        autoIncrement : true
    },
    cliente_id:{
        type: DataTypes.INTEGER.UNSIGNED
    },
    tarifa_id:{
        type: DataTypes.INTEGER.UNSIGNED
    },
    valor:{
        type : DataTypes.INTEGER.UNSIGNED
    }

});
 
module.exports = Clientetarifa;