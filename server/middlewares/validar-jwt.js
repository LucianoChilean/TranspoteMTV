const { response,request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async(req = request,res = response,next) => {

    var   auth       = req.header('Authorization');
    let token;

    if(!auth.includes('Bearer')){
        token = auth;
    }else{
       
        const TokenSplit = auth.split(" ");
        token = TokenSplit[1];
    }


    if(!token){
        return res.status(401).json({
            msg: 'no hay token en la petición'
        })
    }

    try {
        const {uid} = jwt.verify(token, 'test');

        //leer uusuario que corresponde al id
        const usuario = await Usuario.findByPk(uid);

        //Verifica usuario en BD
        if(!usuario){
            return res.status(401).json({
                msg: 'Token no valido - Usuario no existe en DB'
            });
        }

        
        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

    

}

module.exports = {
    validarJWT
}