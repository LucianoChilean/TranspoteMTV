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
const { getModulo, getModulos, postModulo, putModulo, deleteModulo } = require('../controller/modulos');

const router = Router();


router.get('/',[validarJWT],getModulos);


 router.get('/:id',[validarJWT],getModulo);


 router.post('/',[validarJWT],postModulo);


router.put('/:id',[validarJWT],putModulo);


router.delete('/:id',[validarJWT],deleteModulo);




module.exports = router;
