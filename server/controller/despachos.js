const {request,response} = require('express');
const Despacho = require('../models/despacho');




const getDespachos = async(req, res = response) =>{

    const despachos = await Despacho.findAll();

    res.json({despachos});

}

const getDespacho = async(req, res = response) =>{

   
    const {id} = req.params;

    const despacho = await Despacho.findByPk(id);

    res.json({despacho});

}

const postDespacho = async(req, res = response) => {

   
    const {numero,descripcion,nave} = req.body;

    const despacho = Despacho.build({numero,descripcion,nave});


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
                msg: `no existe un ticket con el id ${id}`
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

const deleteDespacho = async(req, res = response) =>{

    const {id} = req.params;

    const despacho = await Despacho.findByPk(id);
    if(!despacho){
        return res.status(404).json({
            msg: `no existe un ticket con el id ${id}`
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
    deleteDespacho}