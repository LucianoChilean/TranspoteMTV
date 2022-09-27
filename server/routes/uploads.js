const { Router, application } = require('express');
const expressFileUpload = require('express-fileupload');


const {
  ValidarCampos,
  validarJWT
} = require('../middlewares');


const { fileUpload, retornaArchivo } = require('../controller/uploads');


const router = Router();

router.use(expressFileUpload());


router.put('/:tipo/:id',[validarJWT],fileUpload);


router.get('/:tipo/:archivo',[validarJWT],retornaArchivo)





module.exports = router;