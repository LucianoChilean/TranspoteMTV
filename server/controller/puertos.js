const {request,response} = require('express');

const Puerto = require('../models/puerto');
const Region = require('../models/region');
const Comuna = require('../models/comuna');


const getPuertos = async(req, res = response) =>{

    const puertos = await Puerto.findAll({
        include: [{ model: Region, 
            attributes:['region_id','nombre']},
            {model: Comuna,
            attributes: ['comuna_id','nombre']}
        ]   
    });

    res.json({puertos});


}

const getPuerto = async(req, res = response) =>{

    const {id} = req.params;

    const puerto = await Puerto.findByPk(id);

    res.json({puerto});

}

const postPuerto = async(req, res = response) => {

    const {nombre,region_id,comuna_id} = req.body;
    const puerto = Puerto.build({nombre,region_id,comuna_id});

    await puerto.save();
    
    res.json({puerto})

}


const putPuerto = async(req,res = response) => {

    const {id} = req.params;
    const {body} = req;

    try{

        const puerto = await Puerto.findByPk(id);

        if(!puerto){
            return res.status(404).json({
                msg: `no existe un Puerto con el id ${id}`
            })
        }

        await puerto.update(body);

        res.json(puerto);
        
    }catch(error){
        console.log(error);
        res.status(505).json({
            msg:'Hable con el administrador'
        })
    }

}

const deletePuerto = async(req, res = response) =>{

    const {id} = req.params;

    const puerto = await Puerto.findByPk(id);
    if(!puerto){
        return res.status(404).json({
            msg: `no existe un Puerto con el id ${id}`
        })
    }
    
    //await puerto.update({estado:false});

    await puerto.destroy({
        where: {
           id : id
        }
    })


    res.json(puerto);


}

module.exports = {getPuertos,
                  getPuerto,
                  postPuerto,
                  putPuerto,
                  deletePuerto}