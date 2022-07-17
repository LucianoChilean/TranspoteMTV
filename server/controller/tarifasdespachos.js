const {response} = require('express');

const Tarifadespacho = require('../models/tarifadespacho');


const getTarifaDespachos = async(req, res = response) => {

    const tarifadespachos = await Tarifadespacho.findAll();

    res.json({tarifadespachos});

}

const getTarifaDespacho = async(req, res = response) => {

    const {id} = req.params;

    const tarifadespacho = await Tarifadespacho.findByPk(id);

    res.json({tarifadespacho});

}

const postTarifaDespacho = async(req, res = response) => {

    const {nombre} = req.body;
    const tarifadespacho = Tarifadespacho.build({nombre});

    await tarifadespacho.save();
    
    res.json({tarifa})

}


const putTarifaDespacho = async(req,res = response) => {

    const {id} = req.params;
    const {body} = req;

    try{

        const tarifadespacho = await Tarifadespacho.findByPk(id);

        if(!tarifa){
            return res.status(404).json({
                msg: `no existe un Tarifa con el id ${id}`
            })
        }

        await tarifadespacho.update(body);

        res.json(tarifa);
        
    }catch(error){
        console.log(error);
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
                  deleteTarifaDespacho}