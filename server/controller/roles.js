const {request,response} = require('express');
const jwt = require('jsonwebtoken');
const Rol = require('../models/rol');




const getRoles = async(req, res = response) =>{

    const roles = await Rol.findAll();

    res.json({roles});

}


const getRol = async(req, res = response) =>{

   
    const {id} = req.params;

    const rol = await Rol.findByPk(id);

    res.json({rol});

}

const postRol = async(req, res = response) => {

   
    const {nombre,descripcion} = req.body;

    const rol = Rol.build({nombre,descripcion});

    await rol.save();
    
    res.json({rol})

}


const putRol = async(req,res = response) => {

    const {id} = req.params;
    const {nombre,descripcion} = req.body;
 
    try{

        const rol = await Rol.findByPk(id);
        if(!rol){
            return res.status(404).json({
                msg: `no existe un Rol con el id ${id}`
            })
        }


        await rol.update({nombre,descripcion});

        res.json(rol);
        
    }catch(error){
        console.log(error);
        res.status(505).json({
            msg:'Hable con el administrador'
        })
    }

}

const deleteRol = async(req, res = response) =>{

    const {id} = req.params;

    const rol = await Rol.findByPk(id);
    if(!rol){
        return res.status(404).json({
            msg: `no existe un Rol con el id ${id}`
        })
    }
    
    //Cambiar borrado por estado
    await rol.destroy({
        where: {
           id : id
        }
    })

    res.json(rol);


}

module.exports = {getRoles,
    getRol,
    postRol,
    putRol,
    deleteRol}