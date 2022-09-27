const {response} = require('express');

const Clientetarifa = require('../models/clientetarifa');
const Tarifa = require('../models/tarifa');


const getClientets = async(req, res = response) => {

    const clientetarifas = await Clientetarifa.findAll();

    res.json({clientetarifas});

}

const getClientet = async(req, res = response) => {

    const {id} = req.params;

    const clientetarifa = await Clientetarifa.findAll({
        include:[{ model: Tarifa, 
            attributes:['nombre']}] , 
        where:{
            cliente_id:id
        }
    });

    res.json({clientetarifa});

}

const postClientet = async(req, res = response) => {

    const {body} = req;
    const clientetarifa = Clientetarifa.build(body);

    await clientetarifa.save();
    
    res.json({clientetarifa})

}


const putClientet = async(req,res = response) => {

    const {id} = req.params;
    const {body} = req;

    try{

        const clientetarifa = await Clientetarifa.findByPk(id);

        if(!clientetarifa){
            return res.status(404).json({
                msg: `no existe un Tarifa con el id ${id}`
            })
        }

        await clientetarifa.update(body);

        res.json(clientetarifa);
        
    }catch(error){
        console.log(error);
        res.status(505).json({
            msg:'Hable con el administrador'
        })
    }

}

const deleteClientet = async(req, res = response) => {

    const {id} = req.params;

    const clientetarifa = await Clientetarifa.findByPk(id);
    if(!clientetarifa){
        return res.status(404).json({
            msg: `no existe un Tarifa con el id ${id}`
        })
    }
    
    await clientetarifa.destroy({
        where: {
           id : id
        }
    })

    res.json(clientetarifa);

}

module.exports = {getClientets,
                  getClientet,
                  postClientet,
                  putClientet,
                  deleteClientet}