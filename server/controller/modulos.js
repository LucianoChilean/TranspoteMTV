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

   
    const {nombre,descripcion,estatus = 'Pendiente'} = req.body;

    const modulo = Modulo.build({nombre,descripcion,estatus});


    await modulo.save();
    
    res.json({modulo})

}


const putModulo = async(req,res = response) => {

    const {id} = req.params;
    const {nombre,descripcion} = req.body;
 
    try{

        const modulo = await Modulo.findByPk(id);
        if(!modulo){
            return res.status(404).json({
                msg: `no existe un ticket con el id ${id}`
            })
        }


        await modulo.update({nombre,descripcion});

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
    
    await modulo.destroy({
        where: {
           id : id
        }
    })

    res.json(modulo);


}

module.exports = {getModulos,
    getModulo,
    postModulo,
    putModulo,
    deleteModulo}