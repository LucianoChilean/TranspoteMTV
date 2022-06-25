const {request,response} = require('express');
const jwt = require('jsonwebtoken');
const Modulo = require('../models/modulo');




const getModulos = async(req, res = response) =>{

    const modulos = await Modulo.findAll();

    res.json({modulos});

}

const getModulo = async(req, res = response) =>{

   
    const {id} = req.params;

    const modulo = await Modulo.findByPk(id);

    res.json({modulo});

}

const postModulo = async(req, res = response) => {

   
    const {titulo,descripcion,estatus = 'Pendiente'} = req.body;

    const modulo = Modulo.build({titulo,descripcion,estatus});


    await modulo.save();
    
    res.json({modulo})

}


const putModulo = async(req,res = response) => {

    const {id} = req.params;
    const {titulo,descripcion,estatus} = req.body;
 
    try{

        const modulo = await Modulo.findByPk(id);
        if(!modulo){
            return res.status(404).json({
                msg: `no existe un ticket con el id ${id}`
            })
        }

        var   auth       = req.header('Authorization');
        const TokenSplit = auth.split(" ");

   
        const token = (TokenSplit[0] === 'Bearer') ? TokenSplit[1] : auth;

        const {uid} = jwt.verify(token, 'test');
        const UsuarioId = uid;

        await modulo.update({titulo,descripcion,estatus,UsuarioId});

        res.json(modulo);
        
    }catch(error){
        console.log(error);
        res.status(505).json({
            msg:'Hable con el administrador'
        })
    }

}

const deleteModulo = async(req, res = response) =>{

    const {id} = req.params;

    const modulo = await Modulo.findByPk(id);
    if(!modulo){
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

    res.json(modulo);


}

module.exports = {getModulos,
    getModulo,
    postModulo,
    putModulo,
    deleteModulo}