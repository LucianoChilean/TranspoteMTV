const {response} = require('express');

const Tarifa = require('../models/tarifa');


const getTarifas = async(req, res = response) => {

    

    const tarifas = await Tarifa.findAll({
        order:[
            ['tarifa_id','DESC']
        ]
    
    });

    res.json({tarifas});

}

const getTarifasByEstado = async(req, res = response) => {

    const {estado} = req.params;

    const tarifas = await Tarifa.findAll({
        order:[
            ['tarifa_id','DESC']
        ],
        where:{
            estado
        }
    })


    res.json({tarifas});

}

const getTarifa = async(req, res = response) => {

    const {id} = req.params;

    const tarifa = await Tarifa.findByPk(id);

    res.json({tarifa});

}

const getTarifaIn = async(req, res = response) => {

    const {params} = req;

    /*const tarifa = await Tarifa.findAll({
        where: {
            tarifa_id: {[Op.in]:[id]}
        }
    })*/
 
    res.json(params);

}

const postTarifa = async(req, res = response) => {

    const {nombre,
           descripcion,
           regla,
           costo,
           estado = 1,
           valor_interno,
           valor_externo} = req.body;
 
    const tarifa = Tarifa.build({
        nombre,
        descripcion,
        regla,
        costo,
        estado,
        valor_interno,
        valor_externo});

    await tarifa.save();
    
    res.json({tarifa})

}


const putTarifa = async(req,res = response) => {

    const {id} = req.params;
    const {body} = req;

    try{

        const tarifa = await Tarifa.findByPk(id);

        if(!tarifa){
            return res.status(404).json({
                msg: `no existe un Tarifa con el id ${id}`
            })
        }

        await tarifa.update(body);

        res.json(tarifa);
        
    }catch(error){
        console.log(error);
        res.status(505).json({
            msg:'Hable con el administrador'
        })
    }

}

const deleteTarifa = async(req, res = response) => {

    const {id} = req.params;

    const tarifa = await Tarifa.findByPk(id);
    if(!tarifa){
        return res.status(404).json({
            msg: `no existe un Tarifa con el id ${id}`
        })
    }
    
    await tarifa.update({estado:false});

    res.json(tarifa);


}

module.exports = {getTarifas,
                  getTarifa,
                  postTarifa,
                  putTarifa,
                  deleteTarifa,
                  getTarifaIn,
                  getTarifasByEstado}