const {request,response} = require('express');
const jwt = require('jsonwebtoken');
const Asignacion = require('../models/asignacion');




const getAsignaciones = async(req, res = response) =>{

    const asignaciones = await Asignacion.findAll();

    res.json({asignaciones});

}

const getAsignacion = async(req, res = response) =>{

   
    const {id} = req.params;

    const asignacion = await Asignacion.findByPk(id);

    res.json({asignacion});

}

const postAsignacion = async(req, res = response) => {

   
    const {titulo,descripcion,estatus = 'Pendiente'} = req.body;

    const asignacion = Asignacion.build({titulo,descripcion,estatus});


    await asignacion.save();
    
    res.json({asignacion})

}


const putAsignacion = async(req,res = response) => {

    const {id} = req.params;
    const {titulo,descripcion,estatus} = req.body;
 
    try{

        const asignacion = await Asignacion.findByPk(id);
        if(!asignacion){
            return res.status(404).json({
                msg: `no existe un ticket con el id ${id}`
            })
        }

        var   auth       = req.header('Authorization');
        const TokenSplit = auth.split(" ");

   
        const token = (TokenSplit[0] === 'Bearer') ? TokenSplit[1] : auth;

        const {uid} = jwt.verify(token, 'test');
        const UsuarioId = uid;

        await asignacion.update({titulo,descripcion,estatus,UsuarioId});

        res.json(asignacion);
        
    }catch(error){
        console.log(error);
        res.status(505).json({
            msg:'Hable con el administrador'
        })
    }

}

const deleteAsignacion = async(req, res = response) =>{

    const {id} = req.params;

    const asignacion = await Asignacion.findByPk(id);
    if(!asignacion){
        return res.status(404).json({
            msg: `no existe un ticket con el id ${id}`
        })
    }
    
    //Cambiar borrado por estado
    /*await ticket.destroy({
        where: {
           id : id
        }
    })*/

    res.json(asignacion);


}

module.exports = {getAsignaciones,
    getAsignacion,
    postAsignacion,
    putAsignacion,
    deleteAsignacion}