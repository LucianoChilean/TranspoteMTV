const {request,response} = require('express');
const Comuna = require('../models/comuna');




const getComunas = async(req, res = response) =>{

    const comunas = await Comuna.findAll();

    res.json({comunas});

}

const getComuna = async(req, res = response) =>{

   
    const {id} = req.params;

    const comuna = await Comuna.findAll({
        where:{
            comuna_id:id
        }
    });

    res.json({comuna});

}


module.exports = {getComunas,
    getComuna}