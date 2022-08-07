const {request,response} = require('express');
const jwt = require('jsonwebtoken');
const Vehiculos = require('../models/vehiculos');



const getVehiculos = async(req, res = response) => { 

    const vehiculos = await Vehiculos.findAll();

    res.json({vehiculos});

}

module.exports = { getVehiculos }