const {request,response} = require('express');
const Detalle = require('../models/detalle');
const Puerto = require('../models/puerto');
const Direccion = require('../models/direccion');


const getDetalleByDespacho = async (req, res = response) =>{
    
    const {id} = req.params;

    const detalles = await Detalle.findAll({
        include: [{ model: Puerto, 
            attributes:['nombre']},
            {model: Direccion,
            attributes: ['direccion']
             }],         
        where:{
            despacho_id : id
        }
    });

    res.json({detalles});

}

const getDetalles = async(req, res = response) =>{

    const detalles = await Detalle.findAll({
        include: [{ model: Puerto, 
            attributes:['nombre']},
            {model: Direccion,
            attributes: ['direccion']
             }]
    });

    res.json({detalles});

}

const getDetalle = async(req, res = response) =>{

   
    const {id} = req.params;

    const detalle = await Detalle.findByPk(id);

    res.json({detalle});

}

const postDetalle = async(req, res = response) => {

   
    const {descripcion,tipo,peso,fecha_retiro,tarjeton,fecha_entrega,devolucion,despacho_id,puerto_id,direccion_id} = req.body;

    const detalle = Detalle.build({descripcion,tipo,peso,fecha_retiro,tarjeton,fecha_entrega,devolucion,despacho_id,puerto_id,direccion_id});

    await detalle.save();
    
    res.json({detalle})

}


const putDetalle = async(req,res = response) => {

    const {id} = req.params;
    const body = req.body;
 
    try{

        const detalle = await Detalle.findByPk(id);
        if(!detalle){
            return res.status(404).json({
                msg: `no existe un Detalle con el id ${id}`
            })
        }


        await detalle.update(body);

        res.json(detalle);
        
    }catch(error){
        console.log(error);
        res.status(505).json({
            msg:'Hable con el administrador'
        })
    }

}

const deleteDetalle = async(req, res = response) =>{

    const {id} = req.params;

    const detalle = await Detalle.findByPk(id);
    if(!detalle){
        return res.status(404).json({
            msg: `no existe un detalle con el id ${id}`
        })
    }
    
    //Cambiar borrado por estado
    await detalle.destroy({
        where: {
           id : id
        }
    })

    res.json(detalle);


}

module.exports = {getDetalles,
    getDetalle,
    postDetalle,
    putDetalle,
    deleteDetalle,
    getDetalleByDespacho}