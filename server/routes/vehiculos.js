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
const { getVehiculos,
        getVehiculo,
        postVehiculo,
        putVehiculo,
        deleteVehiculo } = require('../controller/vehiculos');

const router = Router();


router.get('/',[validarJWT],getVehiculos);

router.get('/:id',[validarJWT],getVehiculo);

router.post('/',[validarJWT],postVehiculo);

router.put('/:id',[validarJWT],putVehiculo);

router.delete('/:id',[validarJWT],deleteVehiculo);






module.exports = router;