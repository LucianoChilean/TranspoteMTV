const {response} = require('express');

const Tarifadespacho = require('../models/tarifadespacho');
const Tarifa = require('../models/tarifa');


const getTarifaDespachos = async(req, res = response) => {

    const tarifadespachos = await Tarifadespacho.findAll();

    res.json({tarifadespachos});

}

const getTarifaDespachoByDid = async(req, res = response) =>{

    const {id} = req.params;

    const tarifadespachos = await Tarifadespacho.findAll({
       include:[{model:Tarifa,
            attributes:['nombre','valor_externo']
        }],
        where:{
            despacho_id : id
        }
    });

    res.json({tarifadespachos})
}

const getTarifaDespacho = async(req, res = response) => {

    const {id} = req.params;

    const tarifadespacho = await Tarifadespacho.findByPk(id);

    res.json({tarifadespacho});

}

const postTarifaDespacho = async(req, res = response) => {

    const {body} = req;
    const tarifadespacho = Tarifadespacho.build(body);

    await tarifadespacho.save();
    
    res.json({tarifadespacho})

}


const putTarifaDespacho = async(req,res = response) => {

    const {id} = req.params;
    const {body} = req;

    try{

        const tarifadespacho = await Tarifadespacho.findByPk(id);

        if(!tarifadespacho){
            return res.status(404).json({
                msg: `no existe un tarifadespacho con el id ${id}`
            })
        }

        await tarifadespacho.update(body);

        res.json(tarifadespacho);
        
    }catch(error){
        res.status(505).json({
            msg:'Hable con el administrador'
        })
    }

}

const deleteTarifaDespacho = async(req, res = response) => {

    const {id} = req.params;

    const tarifadespacho = await Tarifadespacho.findByPk(id);
    if(!tarifadespacho){
        return res.status(404).json({
            msg: `no existe un Tarifa con el id ${id}`
        })
    }
    
    await tarifadespacho.destroy({
        where: {
           id : id
        }
    })

    res.json(tarifadespacho);

}

module.exports = {getTarifaDespachos,
                  getTarifaDespacho,
                  postTarifaDespacho,
                  putTarifaDespacho,
                  deleteTarifaDespacho,
                  getTarifaDespachoByDid}