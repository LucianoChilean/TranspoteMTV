const fs = require('fs');
const Usuario = require('../models/usuario');
const Vehiculo = require('../models/vehiculo');
const Conductor = require('../models/conductor');
const Detalle = require('../models/detalle');


const actualizarArchivo = async (tipo,id,path,nombreArchivo) =>{

    switch (tipo) {
        case 'usuarios':
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            console.log('usuario no existe');
            return false;
        }

        const oldPath = `./uploads/usuarios/${usuario.img}`;
        if (fs.existsSync(oldPath)) {
            fs.unlink(oldPath);
        }

        await usuario.update({imagen:nombreArchivo});
        return true;
        break;

        case 'conductores':
        const conductor = await Conductor.findByPk(id);
        if (!conductor) {
            console.log('conductor no existe')
        }

        const oldPat = `./uploads/conductores/${conductor.imagen}`;
        if (fs.existsSync(oldPat)) {
            fs.unlink(oldPat);
        }
        await conductor.update({imagen:nombreArchivo});
        break;   
                
        case 'vehiculos':
            const vehiculo = await Vehiculo.findByPk(id);
            if (!vehiculo) {
                console.log('vehiculo no existe')
            }
    
           /* const oldPa = `./uploads/vehiculos/${vehiculo.imagen}`;
            if (fs.existsSync(oldPa)) {
                fs.unlink(oldPa);
            }*/
            await vehiculo.update({imagen:nombreArchivo});
            
        break;

        case 'facturas':
            
        break;
    
        default:
        
        break;
    }

}


module.exports = {
    actualizarArchivo
}