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
const { getPuertos, 
        getPuerto, 
        postPuerto, 
        putPuerto, 
        deletePuerto } = require('../controller/puertos');

const router = Router();


router.get('/',[validarJWT],getPuertos);


 router.get('/:id',[validarJWT],getPuerto);


 router.post('/',[validarJWT],postPuerto);


router.put('/:id',[validarJWT],putPuerto);


router.delete('/:id',[validarJWT],deletePuerto);




module.exports = router;
