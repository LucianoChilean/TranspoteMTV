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
const { getRamplas,
        getRampla,
        postRampla,
        putRampla,
        deleteRampla } = require('../controller/ramplas');

const router = Router();


router.get('/',[validarJWT],getRamplas);

router.get('/:id',[validarJWT],getRampla);

router.post('/',[validarJWT],postRampla);

router.put('/:id',[validarJWT],putRampla);

router.delete('/:id',[validarJWT],deleteRampla);


module.exports = router;