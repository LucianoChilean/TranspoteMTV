const {request,response} = require('express');
const jwt = require('jsonwebtoken');
const Cliente = require('../models/cliente');




const getClientes = async(req, res = response) =>{

    const clientes = await Cliente.findAll();

    res.json({clientes});

}

const getCliente = async(req, res = response) =>{

   
    const {id} = req.params;

    const cliente = await Cliente.findByPk(id);

    res.json({cliente});

}

const postCliente = async(req, res = response) => {

   
    const {titulo,descripcion,estatus = 'Pendiente'} = req.body;

    const cliente = Cliente.build({titulo,descripcion,estatus});


    await cliente.save();
    
    res.json({cliente})

}


const putCliente = async(req,res = response) => {

    const {id} = req.params;
    const {titulo,descripcion,estatus} = req.body;
 
    try{

        const cliente = await Cliente.findByPk(id);
        if(!cliente){
            return res.status(404).json({
                msg: `no existe un ticket con el id ${id}`
            })
        }

        var   auth       = req.header('Authorization');
        const TokenSplit = auth.split(" ");

   
        const token = (TokenSplit[0] === 'Bearer') ? TokenSplit[1] : auth;

        const {uid} = jwt.verify(token, 'test');
        const UsuarioId = uid;

        await cliente.update({titulo,descripcion,estatus,UsuarioId});

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
            msg: `no existe un ticket con el id ${id}`
        })
    }
    
    //Cambiar borrado por estado
    /*await ticket.destroy({
        where: {
           id : id
        }
    })*/

    res.json(cliente);


}

module.exports = {getClientes,
    getCliente,
    postCliente,
    putCliente,
    deleteCliente}