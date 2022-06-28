const {request,response} = require('express');

const Direccion = require('../models/direccion');


const getDireccionbyCliente = async(req, res = response) =>{
    
    const {id} = req.params;

    const direcciones = await Direccion.findAll({
        where:{
            cliente_id: id
        }
    });

    res.json({direcciones});

}

const getDirecciones = async(req, res = response) =>{

    /*const {page =2 ,size = 5} = req.query;

    let options = {
        limit: +size,
        offset: (+page) * (+size)
    }

    const { count, rows } = await Direccion.findAndCountAll(options);*/

    const direcciones = await Direccion.findAll();

    res.json({direcciones});


}

const getDireccion = async(req, res = response) =>{

    const {id} = req.params;

    const direccion = await Direccion.findByPk(id);

    res.json({direccion});

}

const postDireccion = async(req, res = response) => {

    const {direccion,descripcion,cliente_id,region_id,comuna_id} = req.body;
    const address = Direccion.build({direccion,descripcion,cliente_id,region_id,comuna_id});

    await address.save();
    
    res.json({address})

}


const putDireccion = async(req,res = response) => {

    const {id} = req.params;
    const {body} = req;

    try{

        const direccion = await Direccion.findByPk(id);

        if(!direccion){
            return res.status(404).json({
                msg: `no existe un Direccion con el id ${id}`
            })
        }

        await direccion.update(body);

        res.json(direccion);
        
    }catch(error){
        console.log(error);
        res.status(505).json({
            msg:'Hable con el administrador'
        })
    }

}

const deleteDireccion = async(req, res = response) =>{

    const {id} = req.params;

    const direccion = await Direccion.findByPk(id);
    if(!direccion){
        return res.status(404).json({
            msg: `no existe un Direccion con el id ${id}`
        })
    }
    
    //await direccion.update({estado:false});

    await direccion.destroy({
        where: {
           id : id
        }
    })


    res.json(direccion);


}

module.exports = {getDirecciones,
                  getDireccion,
                  postDireccion,
                  putDireccion,
                  deleteDireccion,
                  getDireccionbyCliente}