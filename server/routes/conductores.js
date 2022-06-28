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
const { getCondutores, 
        getCondutor, 
        postCondutor, 
        putCondutor, 
        deleteCondutor } = require('../controller/conductores');

const router = Router();


router.get('/',[validarJWT],getCondutores);


 router.get('/:id',[validarJWT],getCondutor);


 router.post('/',[validarJWT],postCondutor);


router.put('/:id',[validarJWT],putCondutor);


router.delete('/:id',[validarJWT],deleteCondutor);




module.exports = router;
