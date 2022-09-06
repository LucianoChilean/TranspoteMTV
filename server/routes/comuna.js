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
const {getComunas,
       getComuna } = require('../controller/comunas');

const router = Router();


router.get('/',[validarJWT],getComunas);

router.get('/:id',[validarJWT],getComuna);


module.exports = router;
