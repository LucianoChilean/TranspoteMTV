const {request,response} = require('express');

const Condutor = require('../models/conductor');


const getCondutores = async(req, res = response) =>{

    /*const {page =2 ,size = 5} = req.query;

    let options = {
        limit: +size,
        offset: (+page) * (+size)
    }

    const { count, rows } = await Condutor.findAndCountAll(options);*/

    const conductores = await Condutor.findAll();

    res.json({conductores});


}

const getCondutor = async(req, res = response) =>{

    const {id} = req.params;

    const condutor = await Condutor.findByPk(id);

    res.json({condutor});

}

const postCondutor = async(req, res = response) => {

    const {nombre,paterno,materno,rut,fono,email,tipo,giro,imagen,propietario_rut} = req.body;
    const condutor = Condutor.build({nombre,paterno,materno,rut,fono,email,tipo,giro,imagen,propietario_rut});

    await condutor.save();
    
    res.json({condutor})

}


const putCondutor = async(req,res = response) => {

    const {id} = req.params;
    const {body} = req;

    try{

        const condutor = await Condutor.findByPk(id);

        if(!condutor){
            return res.status(404).json({
                msg: `no existe un Condutor con el id ${id}`
            })
        }

        await condutor.update(body);

        res.json(condutor);
        
    }catch(error){
        console.log(error);
        res.status(505).json({
            msg:'Hable con el administrador'
        })
    }

}

const deleteCondutor = async(req, res = response) =>{

    const {id} = req.params;

    const condutor = await Condutor.findByPk(id);
    if(!condutor){
        return res.status(404).json({
            msg: `no existe un Condutor con el id ${id}`
        })
    }
    
    //await condutor.update({estado:false});

    await condutor.destroy({
        where: {
           id : id
        }
    })


    res.json(condutor);


}

module.exports = {getCondutores,
                  getCondutor,
                  postCondutor,
                  putCondutor,
                  deleteCondutor}