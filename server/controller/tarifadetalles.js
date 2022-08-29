const {response} = require('express');

const Tarifadetalle = require('../models/tarifadetalle');
const Tarifa = require('../models/tarifa');


const getTarifaDetalles = async(req, res = response) => {

    const tarifadetalles = await Tarifadetalle.findAll();

    res.json({tarifadetalles});

}

const getTarifaDetalleByDid = async(req, res = response) =>{

    const {id} = req.params;

    const tarifadetalles = await Tarifadetalle.findAll({
       include:[{model:Tarifa,
            attributes:['nombre','valor_externo','valor_interno']
        }],
        where:{
            detalle_id : id
        }
    });

    res.json({tarifadetalles})
}

const getTarifaDetalle = async(req, res = response) => {

    const {id} = req.params;

    const tarifadetalle = await Tarifadetalle.findByPk(id);

    res.json({tarifadetalle});

}

const postTarifaDetalle = async(req, res = response) => {

    const {body} = req;
    const tarifadetalle = Tarifadetalle.build(body);

    await tarifadetalle.save();
    
    res.json({tarifadetalle})

}


const putTarifaDetalle = async(req,res = response) => {

    const {id} = req.params;
    const {body} = req;

    try{

        const tarifadetalle = await Tarifadetalle.findByPk(id);

        if(!tarifadetalle){
            return res.status(404).json({
                msg: `no existe un tarifadespacho con el id ${id}`
            })
        }

        await tarifadetalle.update(body);

        res.json(tarifadetalle);
        
    }catch(error){
        res.status(505).json({
            msg:'Hable con el administrador'
        })
    }

}

const deleteTarifaDetalle = async(req, res = response) => {

    const {id} = req.params;

    const tarifadetalle = await Tarifadetalle.findByPk(id);
    if(!tarifadetalle){
        return res.status(404).json({
            msg: `no existe un Tarifa con el id ${id}`
        })
    }
    
    await tarifadetalle.destroy({
        where: {
           id : id
        }
    })

    res.json(tarifadetalle);

}

module.exports = {getTarifaDetalles,
                  getTarifaDetalleByDid,
                  getTarifaDetalle,
                  postTarifaDetalle,
                  putTarifaDetalle,
                  deleteTarifaDetalle}