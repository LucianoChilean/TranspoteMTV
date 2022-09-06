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
const {getRegiones,
       getRegion } = require('../controller/regiones');

const router = Router();


router.get('/',[validarJWT],getRegiones);

router.get('/:id',[validarJWT],getRegion);


module.exports = router;
