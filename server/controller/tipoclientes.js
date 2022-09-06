const {request,response} = require('express');
const Tcliente = require('../models/tipo_cliente');




const getTclientes = async(req, res = response) =>{

    const tclientes = await Tcliente.findAll();

    res.json({tclientes});

}

const getTcliente = async(req, res = response) =>{

   
    const {id} = req.params;

    const tclientes = await Tcliente.findAll({
        where:{
            tipo_cliente_id:id
        }
    });

    res.json({tclientes});

}


module.exports = {getTclientes,
    getTcliente}