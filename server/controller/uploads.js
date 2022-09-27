const path = require('path');
const fs = require("fs");

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarArchivo } = require('../helpers/actualizar-archivo');

const fileUpload = async(req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['conductores','facturas','usuarios','vehiculos'];
    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok:false,
            msg: 'El tipo no corresponde a los existentes en sistema',
        });
    }

    // Validar archivo existente
    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).json({
            ok:false,
            msg: 'No hay ningun archivo',
        });
    }

    // Procesar el archivo...
    const file  = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1]; 

    // Validar extension
    const extensionesValidas = ['png','jpg','jpeg','pdf'];
    if(!extensionesValidas.includes(extensionArchivo)){
        return res.status(400).json({
            ok:false,
            msg: 'No es una extension permitida',
        });
    }

    //Generar nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    //Path para guardar imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    file.mv(path,(err)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen',
            });
        }
        
    res.json({
        ok:true,
        msg: 'Archivo Subido',
        nombreArchivo
    });

    });

    // Actualizar la base de datos 
    actualizarArchivo(tipo,id,path,nombreArchivo);


}

const retornaArchivo = (req, res) =>{

    const {tipo,archivo} = req.params;

   const pathFile = path.join(__dirname, `../uploads/${tipo}/${archivo}`);

    if( fs.existsSync(pathFile)){
        res.sendFile(pathFile);
    }else{
        const pathFile = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathFile);
    }
}

module.exports = { fileUpload,
                   retornaArchivo };