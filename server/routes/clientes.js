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
const { getClientes, 
        getCliente, 
        postCliente, 
        putCliente, 
        deleteCliente } = require('../controller/clientes');

const router = Router();


router.get('/',[validarJWT],getClientes);


 router.get('/:id',[validarJWT],getCliente);


 router.post('/',[validarJWT],postCliente);


router.put('/:id',[validarJWT],putCliente);


router.delete('/:id',[validarJWT],deleteCliente);




module.exports = router;
