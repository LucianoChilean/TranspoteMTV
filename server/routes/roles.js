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
const { getRol, getRoles, postRol, putRol, deleteRol } = require('../controller/roles');

const router = Router();


router.get('/',[validarJWT],getRoles);


 router.get('/:id',[validarJWT],getRol);


 router.post('/',[validarJWT],postRol);


router.put('/:id',[validarJWT],putRol);


router.delete('/:id',[validarJWT],deleteRol);




module.exports = router;
