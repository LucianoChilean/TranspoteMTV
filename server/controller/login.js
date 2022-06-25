const bcryptjs = require("bcryptjs/dist/bcrypt");
const { response } = require("express");
const { generarJWT } = require("../helpers/generar-jwt");


const  Usuario  = require('../models/usuario');


const login = async(req, res = response) => {

    const {body} = req;

  

    try {

        //Verificar si el email existe
        const usuario = await Usuario.findOne({
            where:{
                email: body.email
            }
        });

        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / contraseña no son correctos - correo'
            });
        }
       
    
     
       
        //Verificar la contraseña
        const validPassword = await bcryptjs.compareSync(body.password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario / contraseña no son correctos - password'
            });
        }

        //Generar el JWT
       const token = await generarJWT(usuario.usuario_id);

       res.json({
           usuario,
           token
        });

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

       
}


module.exports = {
    login
};
