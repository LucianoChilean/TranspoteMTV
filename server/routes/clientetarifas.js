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
const { getClientets, 
        getClientet, 
        postClientet, 
        putClientet, 
        deleteClientet } = require('../controller/clientetarifas');

const router = Router();


router.get('/',[validarJWT],getClientets);


 router.get('/:id',[validarJWT],getClientet);


 router.post('/',[validarJWT],postClientet);


router.put('/:id',[validarJWT],putClientet);


router.delete('/:id',[validarJWT],deleteClientet);




module.exports = router;
