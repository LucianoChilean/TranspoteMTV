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
const { getTarifaDespachos, 
  getTarifaDespacho, 
  postTarifaDespacho, 
  putTarifaDespacho, 
  deleteTarifaDespacho, 
  getTarifaDespachoByDid} = require('../controller/tarifasdespachos');

const router = Router();


router.get('/',[validarJWT],getTarifaDespachos);

router.get('/:id',[validarJWT],getTarifaDespacho);

router.get('/DespachoId/:id',[validarJWT],getTarifaDespachoByDid);

router.post('/',[validarJWT],postTarifaDespacho);

router.put('/:id',[validarJWT],putTarifaDespacho);

router.delete('/:id',[validarJWT],deleteTarifaDespacho);


module.exports = router;
