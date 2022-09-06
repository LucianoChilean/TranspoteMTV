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
const {getTclientes,
       getTcliente } = require('../controller/tipoclientes');

const router = Router();


router.get('/',[validarJWT],getTclientes);

router.get('/:id',[validarJWT],getTcliente);


module.exports = router;
