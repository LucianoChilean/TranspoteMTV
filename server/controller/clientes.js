const {request,response} = require('express');
const Cliente = require('../models/cliente');




const getClientes = async(req, res = response) =>{

    const clientes = await Cliente.findAll();

    res.json({clientes});

}

const getCliente = async(req, res = response) =>{

   
    const {id} = req.params;

    const clientes = await Cliente.findAll({
        where:{
            cliente_id:id
        }
    });

    res.json({clientes});

}

const postCliente = async(req, res = response) => {

   
    const {rut,nombre,giro,tipo_cliente_id = 1,direccion} = req.body;

    const cliente = Cliente.build({rut,nombre,giro,tipo_cliente_id,direccion});


    await cliente.save();
    
    res.json({cliente})

}


const putCliente = async(req,res = response) => {

    const {id} = req.params;
    const {rut,nombre,giro,tipo_cliente_id = 1,direccion} = req.body;
 
    try{

        const cliente = await Cliente.findByPk(id);
        if(!cliente){
            return res.status(404).json({
                msg: `no existe un cliente con el id ${id}`
            })
        }


        await cliente.update({rut,nombre,giro,tipo_cliente_id,direccion});

        res.json(cliente);
        
    }catch(error){
        console.log(error);
        res.status(505).json({
            msg:'Hable con el administrador'
        })
    }

}

const deleteCliente = async(req, res = response) =>{

    const {id} = req.params;

    const cliente = await Cliente.findByPk(id);
    if(!cliente){
        return res.status(404).json({
            msg: `no existe un cliente con el id ${id}`
        })
    }
    
    //Cambiar borrado por estado
    await cliente.destroy({
        where: {
           id : id
        }
    })

    res.json(cliente);


}

module.exports = {getClientes,
    getCliente,
    postCliente,
    putCliente,
    deleteCliente}