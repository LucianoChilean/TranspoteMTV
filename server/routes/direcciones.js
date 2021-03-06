const { Router } = require('express');
const { check }  = require('express-validator');


const {
  ValidarCampos,
  validarJWT
} = require('../middlewares');

/*
const { 
        emailExiste,
        ExisteUsuarioPorId } = require('../helpers/db-validators');
*/
const { getDirecciones, 
        getDireccion, 
        postDireccion, 
        putDireccion, 
        deleteDireccion, 
        getDireccionbyCliente} = require('../controller/direcciones');

const router = Router();


router.get('/',[validarJWT],getDirecciones);


 router.get('/:id',[validarJWT],getDireccion);

 router.get('/DirByCliId/:id',[validarJWT],getDireccionbyCliente);


 router.post('/',[validarJWT],postDireccion);


router.put('/:id',[validarJWT],putDireccion);


router.delete('/:id',[validarJWT],deleteDireccion);




module.exports = router;
