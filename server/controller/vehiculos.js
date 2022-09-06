const {request,response} = require('express');
const Vehiculo = require('../models/vehiculo');




const getVehiculos = async(req, res = response) =>{

    const vehiculos = await Vehiculo.findAll();

    res.json({vehiculos});

}

const getVehiculo = async(req, res = response) =>{

   
    const {id} = req.params;

    const vehiculo = await Vehiculo.findAll({
        where:{
            vehiculo_id:id
        }
    });

    res.json({vehiculo});

}

const postVehiculo = async(req, res = response) => {

   
    const {rut,nombre,giro,tipo_cliente_id = 1,direccion} = req.body;

    const vehiculo = Vehiculo.build({rut,nombre,giro,tipo_cliente_id,direccion});


    await vehiculo.save();
    
    res.json({vehiculo})

}


const putVehiculo = async(req,res = response) => {

    const {id} = req.params;
    const {rut,nombre,giro,tipo_cliente_id = 1,direccion} = req.body;
 
    try{

        const vehiculo = await Vehiculo.findByPk(id);
        if(!vehiculo){
            return res.status(404).json({
                msg: `no existe un cliente con el id ${id}`
            })
        }


        await vehiculo.update({rut,nombre,giro,tipo_cliente_id,direccion});

        res.json(vehiculo);
        
    }catch(error){
        console.log(error);
        res.status(505).json({
            msg:'Hable con el administrador'
        })
    }

}

const deleteVehiculo = async(req, res = response) =>{

    const {id} = req.params;

    const vehiculo = await Vehiculo.findByPk(id);
    if(!vehiculo){
        return res.status(404).json({
            msg: `no existe un cliente con el id ${id}`
        })
    }
    
    //Cambiar borrado por estado
    await vehiculo.destroy({
        where: {
           id : id
        }
    })

    res.json(vehiculo);


}

module.exports = {getVehiculos,
    getVehiculo,
    postVehiculo,
    putVehiculo,
    deleteVehiculo}