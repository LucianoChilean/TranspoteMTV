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
const { getDespachos, getDespacho, postDespacho, putDespacho, deleteDespacho } = require('../controller/despachos');

const router = Router();


router.get('/',[validarJWT],getDespachos);


 router.get('/:id',[validarJWT],getDespacho);


 router.post('/',[validarJWT],postDespacho);


router.put('/:id',[validarJWT],putDespacho);


router.delete('/:id',[validarJWT],deleteDespacho);




module.exports = router;
