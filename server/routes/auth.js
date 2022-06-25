const { Router } = require('express');
const { check } = require('express-validator');
const { ValidarCampos } = require('../middlewares/validar-campos');
const {login} = require('../controller/login')

const router = Router();

/**
 *@swagger
 *components:
 *   schemas:
 *       login:
 *          type: object
 *          properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             createdAt: 
 *               type: string
 *             updatedAt:
 *               type: string
 *             token:
 *               type: string
 *          example:
 *            email: Testing@gmail.com
 *            password: "$2a$10$duOPfLdkaQiqUlPyc8qB5.w5SQtctbxoH49BYxnYrfev/oX6/kHFm"
 *            createdAt: "2022-06-08T19:50:15.000Z" 
 *            updatedAt: "2022-06-08T19:50:15.000Z"  
 *            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEwLCJpYXQiOjE2NTQ3NDgxMjQsImV4cCI6MTY1NDc2MjUyNH0.iT_0FAyJHBBrFhtDVZyWNSn4qf5TSf8-7ky1YNcqlRg"             
 */



/**
 *@swagger
 * /api/auth/login:
 *   post:
 *      summary: Ejecutar esta ruta para que retorne token para las siguientes rutas
 *      tags: [login]
 *      requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                  type: object
 *                  $ref: '#/components/schemas/usuarios'
 *      responses:
 *          200:
 *            description: Usuario Autenticado
 *            content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/login'   
 */
router.post('/login',[
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es oblitatoria').not().isEmpty(),
    ValidarCampos
], login);



module.exports = router;