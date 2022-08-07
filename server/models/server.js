const db      = require('../db/connection');
const express = require('express');
const cors    = require('cors');
const path    = require('path');
//Swagger
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerSpec = {
    definition:{
        openapi: "3.0.0",
        info:{
            title: "Test API",
            version: "1.0.0",
            contact:{
                email: "mattensohn64@gmail.com"
            }
        },
        servers:[{
            url:"http://localhost:8080"
        }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        }
    },
    apis:[`${path.join(__dirname,"../routes/*.js")}`],
};

class Server{

   constructor(){
       this._app  = express();
       this.port = process.env.PORT;

       this.paths = {
        usuarios:     '/api/usuarios',
        detalles:     '/api/detalles',
        despachos:    '/api/despachos',
        swagger:      '/api-doc',
        auth:         '/api/auth',
        puertos:      '/api/puertos',
        direcciones:  '/api/direcciones',
        conductores:  '/api/conductores',
        clientes:     '/api/clientes',
        tarifas:      '/api/tarifas',
        tarifasD:     '/api/tarifasd',
        tarifasC:     '/api/tarifasc',
        tarifasDet:   '/api/tarifasdet',
        vehiculos:    '/api/vehiculos'
       };

       this.connectDB();
       this.middlewares();
       this.routes();

   }

   async connectDB(){
     try {
        await db.authenticate();
        //await db.sync({force:true}); 
        //await db.sync();
     }catch(e){
        console.log(e)
        throw new Error('error en conectar BD');
     }
    }

    middlewares(){
         //Cors
         this._app.use(cors());
         //Lectura del body
         this._app.use(express.json());
         //Ver express levantado
         this._app.use(express.static('public'));

    }

    routes(){

        this._app.use(this.paths.auth,require('../routes/auth'));
        this._app.use(this.paths.usuarios,require('../routes/usuarios'));
        this._app.use(this.paths.despachos,require('../routes/despachos'));
        this._app.use(this.paths.detalles,require('../routes/detalles'));
        this._app.use(this.paths.puertos,require('../routes/puertos'));
        this._app.use(this.paths.direcciones,require('../routes/direcciones'));
        this._app.use(this.paths.conductores,require('../routes/conductores'));
        this._app.use(this.paths.clientes,require('../routes/clientes'));
        this._app.use(this.paths.tarifas,require('../routes/tarifas'));
        this._app.use(this.paths.tarifasC,require('../routes/clientetarifas'));
        this._app.use(this.paths.tarifasD,require('../routes/tarifasdespachos'));
        this._app.use(this.paths.tarifasDet,require('../routes/tarifasdetalles'));
        this._app.use(this.paths.vehiculos,require('../routes/vehiculos'));
        this._app.use(this.paths.swagger,swaggerUI.serve,swaggerUI.setup(swaggerJsDoc(swaggerSpec)));


    }

    listen(){
        this._app.listen(this.port, ()=>{
                console.log('Servidor corriendo en el puerto ', this.port);
        })
    }


}


module.exports = Server; 