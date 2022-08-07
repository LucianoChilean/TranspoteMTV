const { Router } = require('express');
const { check }  = require('express-validator');


const {
  ValidarCampos,
  validarJWT
} = require('../middlewares');

const { getVehiculos } = require('../controller/vehiculos');

const router = Router();


router.get('/',[validarJWT],getVehiculos);




module.exports = router;
