const {request,response} = require('express');
const Ingresos = require('../models/ingresos');




const getIngresos = async(req, res = response) =>{

    const ingresos = await Ingresos.findAll();

    res.json({ingresos});

}

const getIngreso = async(req, res = response) =>{

   
    const {id} = req.params;

    const ingreso = await Ingresos.findAll({
        where:{
            ingreso_id:id
        }
    });

    res.json({ingreso});

}

const postIngreso = async(req, res = response) => {

   
    const {rut,nombre,giro,tipo_cliente_id = 1,direccion} = req.body;

    const ingreso = Ingresos.build({rut,nombre,giro,tipo_cliente_id,direccion});


    await ingreso.save();
    
    res.json({ingreso})

}


const putIngreso = async(req,res = response) => {

    const {id} = req.params;
    const {rut,nombre,giro,tipo_cliente_id = 1,direccion} = req.body;
 
    try{

        const ingreso = await Ingresos.findByPk(id);
        if(!ingreso){
            return res.status(404).json({
                msg: `no existe un cliente con el id ${id}`
            })
        }


        await ingreso.update({rut,nombre,giro,tipo_cliente_id,direccion});

        res.json(ingreso);
        
    }catch(error){
        console.log(error);
        res.status(505).json({
            msg:'Hable con el administrador'
        })
    }

}

const deleteIngreso = async(req, res = response) =>{

    const {id} = req.params;

    const ingreso = await Ingresos.findByPk(id);
    if(!ingreso){
        return res.status(404).json({
            msg: `no existe un cliente con el id ${id}`
        })
    }
    
    //Cambiar borrado por estado
    await ingreso.destroy({
        where: {
           id : id
        }
    })

    res.json(ingreso);


}

module.exports = {getIngresos,
    getIngreso,
    postIngreso,
    putIngreso,
    deleteIngreso}