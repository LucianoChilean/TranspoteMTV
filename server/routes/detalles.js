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
const { getDetalles, 
        getDetalle, 
        postDetalle, 
        putDetalle, 
        deleteDetalle, 
        getDetalleByDespacho, 
        putDetalleByDespacho, 
        getDetalleByEstado } = require('../controller/detalles');

const router = Router();


router.get('/',[validarJWT],getDetalles);
router.get('/:id',[validarJWT],getDetalle);
router.get('/ByDesId/:id',[validarJWT],getDetalleByDespacho);
router.get('/estado/:estado',[validarJWT],getDetalleByEstado);

router.post('/',[validarJWT],postDetalle);

router.put('/:id',[validarJWT],putDetalle);
router.put('/despacho/:id',[validarJWT],putDetalleByDespacho);

router.delete('/:id',[validarJWT],deleteDetalle);







module.exports = router;
