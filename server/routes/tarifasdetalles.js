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
const { getTarifaDetalles, 
        getTarifaDetalle, 
        getTarifaDetalleByDid, 
        postTarifaDetalle, 
        putTarifaDetalle, 
        deleteTarifaDetalle } = require('../controller/tarifadetalles');

const router = Router();


router.get('/',[validarJWT],getTarifaDetalles);

router.get('/:id',[validarJWT],getTarifaDetalle);

router.get('/DetalleId/:id',[validarJWT],getTarifaDetalleByDid);

router.post('/',[validarJWT],postTarifaDetalle);

router.put('/:id',[validarJWT],putTarifaDetalle);

router.delete('/:id',[validarJWT],deleteTarifaDetalle);


module.exports = router;
