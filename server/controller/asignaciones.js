const {request,response} = require('express');
const jwt = require('jsonwebtoken');
const Asignacion = require('../models/asignacion');
const modulo = require('../models/modulo');




const getAsignaciones = async(req, res = response) =>{

    const asignaciones = await Asignacion.findAll();

    res.json({asignaciones});

}

const getModulosByIdRol = async(req, res = response)=>{

    const {id} = req.params;

    const usermodule = await Asignacion.findAll({
        attributes:{
            exclude:[
                'asignacion_id',
                'rol_id',
                'modulo_id',
                'createdAt',
                'updatedAt',
        ]
        },
        include:[{
            model:modulo,
            as:modulo,
            attributes:["nombre",
                        "descripcion",
                        "modulo_padre",
                        "modulo_orden",
                        "padre_orden",
                        "icons"]
        }],
        order: [
            [ modulo, 'padre_orden', 'ASC' ], 
            [ modulo, 'modulo_orden', 'ASC' ]
          ],
        where:{
            rol_id: id
        }
    });

    res.json({usermodule});

}

const getAsignacion = async(req, res = response) =>{

   
    const {id} = req.params;

    const asignacion = await Asignacion.findByPk(id);

    res.json({asignacion});

}

const postAsignacion = async(req, res = response) => {

   
    const {rol_id,modulo_id} = req.body;

    const asignacion = Asignacion.build({rol_id,modulo_id});


    await asignacion.save();
    
    res.json({asignacion})

}


const putAsignacion = async(req,res = response) => {

    const {id} = req.params;
    const {rol_id,modulo_id} = req.body;
 
    try{

        const asignacion = await Asignacion.findByPk(id);
        if(!asignacion){
            return res.status(404).json({
                msg: `no existe un asignacion con el id ${id}`
            })
        }

        await asignacion.update({rol_id,modulo_id});

        res.json(asignacion);
        
    }catch(error){
        console.log(error);
        res.status(505).json({
            msg:'Hable con el administrador'
        })
    }

}

const deleteAsignacion = async(req, res = response) =>{

    const {id} = req.params;

    const asignacion = await Asignacion.findByPk(id);
    if(!asignacion){
        return res.status(404).json({
            msg: `no existe un Asignación con el id ${id}`
        })
    }
    
    //Cambiar borrado por estado
    await asignacion.destroy({
        where: {
           id : id
        }
    })

    res.json(asignacion);


}

module.exports = {getAsignaciones,
    getAsignacion,
    postAsignacion,
    putAsignacion,
    deleteAsignacion,
    getModulosByIdRol
}