const {request,response} = require('express');

const Puerto = require('../models/puerto');


const getPuertos = async(req, res = response) =>{

    /*const {page =2 ,size = 5} = req.query;

    let options = {
        limit: +size,
        offset: (+page) * (+size)
    }

    const { count, rows } = await Puerto.findAndCountAll(options);*/

    const puertos = await Puerto.findAll();

    res.json({puertos});


}

const getPuerto = async(req, res = response) =>{

    const {id} = req.params;

    const puerto = await Puerto.findByPk(id);

    res.json({puerto});

}

const postPuerto = async(req, res = response) => {

    const {nombre} = req.body;
    const puerto = Puerto.build({nombre});

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