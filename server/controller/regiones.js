const {request,response} = require('express');
const Region = require('../models/region');




const getRegiones = async(req, res = response) =>{

    const regiones = await Region.findAll();

    res.json({regiones});

}

const getRegion = async(req, res = response) =>{

   
    const {id} = req.params;

    const region = await Region.findAll({
        where:{
            region_id:id
        }
    });

    res.json({region});

}


module.exports = {getRegiones,
    getRegion}