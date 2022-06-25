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
const { getAsignaciones, getAsignacion, postAsignacion, putAsignacion, deleteAsignacion } = require('../controller/asignaciones');

const router = Router();


router.get('/',[validarJWT],getAsignaciones);


 router.get('/:id',[validarJWT],getAsignacion);


 router.post('/',[validarJWT],postAsignacion);


router.put('/:id',[validarJWT],putAsignacion);


router.delete('/:id',[validarJWT],deleteAsignacion);




module.exports = router;
