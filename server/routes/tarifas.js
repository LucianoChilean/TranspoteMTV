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
const {  
     getTarifa, 
     getTarifas, 
     postTarifa, 
     putTarifa, 
     deleteTarifa,
     getTarifaIn,
     getTarifasByEstado} = require('../controller/tarifas');

const router = Router();


router.get('/',[validarJWT],getTarifas);

router.get('/:id',[validarJWT],getTarifa);

router.get('/In',[validarJWT],getTarifaIn);

router.get('/byEstado/:estado',[validarJWT],getTarifasByEstado);

router.post('/',[validarJWT],postTarifa);

router.put('/:id',[validarJWT],putTarifa);

router.delete('/:id',[validarJWT],deleteTarifa);






module.exports = router;
