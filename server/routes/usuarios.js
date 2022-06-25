const { Router } = require('express');
const { check }  = require('express-validator');


//Obtiene los middlewares desde el archivo index en la carpeta misma

/**
 *@swagger
 *components:
 *  schemas:
 *    usuarios:
 *       type: object
 *       properties: 
 *          email:
 *            type: string
 *            descripcion: correo usuario
 *          password:
 *            type: string
 *            descripcion: contraseña de usuario
 *       example:
 *          email: Testing@gmail.com
 *          password: "123456"
 */



const {
  ValidarCampos,
  validarJWT
} = require('../middlewares');

/*
const { 
        emailExiste,
        ExisteUsuarioPorId } = require('../helpers/db-validators');
*/
const {getUsuarios,
       getUsuario,
       postUsuario,
       putUsuario, 
       deleteUsuario } = require('../controller/usuarios');

const router = Router();

/**
 *@swagger
 * /api/usuarios:
 *   get:
 *      security: 
 *       - bearerAuth: []
 *      summary: Obtiene listado de usuarios
 *      tags: [usuario]
 *      responses:
 *        200:
 *          description: Listado de usuarios
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/usuarios'   
 */
router.get('/',[validarJWT],getUsuarios);

/**
 *@swagger
 * /api/usuarios/{id}:
 *   get:
 *      security: 
 *       - bearerAuth: []
 *      summary: Obtiene Usuario especifico por ID
 *      tags: [usuario]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema: 
 *            type: string
 *          required: true
 *          description: ID usuario
 *      responses:
 *        200:
 *          description: Datos de usuarios obtenidos
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/usuarios'   
 *        404:
 *          description: user not found
 */
 router.get('/:id',[validarJWT],getUsuario);

/**
 *@swagger
 * /api/usuarios:
 *   post:
 *      security: 
 *       - bearerAuth: []
 *      summary: Crea Usuarios
 *      tags: [usuario]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *           schema:
 *             type: object
 *             $ref:  '#/components/schemas/usuarios' 
 *      responses:
 *        200:
 *          description: nuevo usuario creado
 */
 router.post('/',postUsuario);

/**
 *@swagger
 * /api/usuarios/{id}:
 *   put:
 *      security: 
 *       - bearerAuth: []
 *      summary: Edita datos de usuario
 *      tags: [usuario]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema: 
 *            type: string
 *          required: true
 *          description: ID usuario
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *           schema:
 *             type: object
 *             $ref:  '#/components/schemas/usuarios' 
 *      responses:
 *        200:
 *          description: Usuario Actualizado
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/usuarios'   
 *        404:
 *          description: user not found
 */
router.put('/:id',[validarJWT],putUsuario);

/**
 *@swagger
 * /api/usuarios/{id}:
 *   delete:
 *      security: 
 *       - bearerAuth: []
 *      summary: Elimina usuario
 *      tags: [usuario]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema: 
 *            type: string
 *          required: true
 *          description: ID usuario
 *      responses:
 *        200:
 *          description: Usuario Eliminado
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/usuarios' 
 */
router.delete('/:id',[validarJWT],deleteUsuario);




module.exports = router;
