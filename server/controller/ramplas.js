const {request,response} = require('express');
const Rampla = require('../models/rampla');




const getRamplas = async(req, res = response) =>{

    const ramplas = await Rampla.findAll();

    res.json({ramplas});

}

const getRampla = async(req, res = response) =>{

   
    const {id} = req.params;

    const rampla = await Rampla.findAll({
        where:{
            rampla_id:id
        }
    });

    res.json({rampla});

}

const postRampla = async(req, res = response) => {

   
    const {nombre,descripcion} = req.body;

    const rampla = Rampla.build({nombre,descripcion});


    await rampla.save();
    
    res.json({rampla})

}


const putRampla = async(req,res = response) => {

    const {id} = req.params;
    const {nombre,descripcion} = req.body;
 
    try{

        const rampla = await Rampla.findByPk(id);
        if(!rampla){
            return res.status(404).json({
                msg: `no existe una rampla con el id ${id}`
            })
        }


        await rampla.update({nombre,descripcion});

        res.json(rampla);
        
    }catch(error){
        console.log(error);
        res.status(505).json({
            msg:'Hable con el administrador'
        })
    }

}

const deleteRampla = async(req, res = response) =>{

    const {id} = req.params;

    const rampla = await Rampla.findByPk(id);
    if(!rampla){
        return res.status(404).json({
            msg: `no existe un cliente con el id ${id}`
        })
    }
    
    //Cambiar borrado por estado
    await rampla.destroy({
        where: {
           id : id
        }
    })

    res.json(vehiculo);


}

module.exports = {getRamplas,
    getRampla,
    postRampla,
    putRampla,
    deleteRampla}