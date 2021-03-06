const {request,response} = require('express');
const Despacho = require('../models/despacho');
const Puerto = require('../models/puerto');
const Conductor = require('../models/conductor');
const Cliente = require('../models/cliente');




const getDespachos = async(req, res = response) =>{

    const despachos = await Despacho.findAll({
        include: [{ model: Puerto, 
            attributes:['puerto_id','nombre']},
            {model: Conductor,
            attributes: ['conductor_id','nombre','paterno','materno']},
            {model: Cliente,
            attributes: ['cliente_id','nombre']
            }]      
        });

    res.json({despachos});

}

const getDespachoByEstado = async(req, res = response) =>{

    const {estado} = req.params;

    const despachos = await Despacho.findAll({
        include: [{ model: Puerto, 
            attributes:['puerto_id','nombre']},
            {model: Conductor,
            attributes: ['conductor_id','nombre','paterno','materno']},
            {model: Cliente,
            attributes: ['cliente_id','nombre']
            }],         
            where:{
                estado: estado
            }           
        });

    res.json({despachos});

}

const getDespacho = async(req, res = response) =>{

   
    const {id} = req.params;

    const despacho = await Despacho.findByPk(id);

    res.json({despacho});

}

const postDespacho = async(req, res = response) => {

   
    const {numero,descripcion,nave,estado = 'Proceso',puerto_id,conductor_id,cliente_id} = req.body;

    const despacho = Despacho.build({numero,descripcion,nave,estado,puerto_id,conductor_id,cliente_id});


    await despacho.save();
    
    res.json({despacho})

}


const putDespacho = async(req,res = response) => {

    const {id} = req.params;
    const body = req.body;
 
    try{

        const despacho = await Despacho.findByPk(id);
        if(!despacho){
            return res.status(404).json({
                msg: `no existe un Despacho con el id ${id}`
            })
        }


        await despacho.update(body);

        res.json(despacho);
        
    }catch(error){
        console.log(error);
        res.status(505).json({
            msg:'Hable con el administrador'
        })
    }

}

const putDespachoByEstado = async(req, res = response) => {

    const {id} = req.params;
    const {estado} = req.body;


    try{

        const despacho = await Despacho.findByPk(id);
        if(!despacho){
            return res.status(404).json({
                msg: `no existe un Despacho con el id ${id}`
            })
        }


        await despacho.update({estado});

        res.json(despacho);
        
    }catch(error){
        console.log(error);
        res.status(505).json({
            msg:'Hable con el administrador'
        })
    }

}

const deleteDespacho = async(req, res = response) =>{

    const {id} = req.params;

    const despacho = await Despacho.findByPk(id);
    if(!despacho){
        return res.status(404).json({
            msg: `no existe un Despacho con el id ${id}`
        })
    }

    //Cambiar borrado por estado
    await despacho.destroy({
        where: {
           id : id
        }
    })

    res.json(despacho);

}


module.exports = {getDespachos,
    getDespacho,
    postDespacho,
    putDespacho,
    deleteDespacho,
    getDespachoByEstado,
    putDespachoByEstado}