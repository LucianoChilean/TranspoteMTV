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
const { getDetalles, getDetalle, postDetalle, putDetalle, deleteDetalle } = require('../controller/detalles');

const router = Router();


router.get('/',[validarJWT],getDetalles);


 router.get('/:id',[validarJWT],getDetalle);


 router.post('/',[validarJWT],postDetalle);


router.put('/:id',[validarJWT],putDetalle);


router.delete('/:id',[validarJWT],deleteDetalle);




module.exports = router;
