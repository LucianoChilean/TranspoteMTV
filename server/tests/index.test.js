const request  = require('supertest');
//const request = supertest(app);
const Server = require('../models/server');
const server = new Server();

let token;

beforeAll((done) => {
  request(server.app)
    .post('/api/auth/login')
    .send({
        email : "Testing@gmail.com",
        password : "123456"
    })
    .end((err, response) => {
      token = response.body.token; // save the token!
      done();
    });
});

        
describe('Test a ruta /api/usuarios', () =>{

    let UserId;

    test('comprobando GET /api/usuarios', async () => {
        const response = await request(server.app).get('/api/usuarios').set({'Authorization':token})
        .send();
        expect(response.statusCode).toBe(200);
       });

    test('Comprobando POST /api/usuarios', async() =>{
        const response = await request(server.app).post('/api/usuarios').set({'Authorization':token})
        .send({
            "email" : "TestUnitarios@gmail.com",
            "password" : "123456"
        });
        UserId = response.body.usuario.id;
        expect(response.statusCode).toBe(200);
    });

    test('Comprobando GET /api/usuarios/:id', async() =>{
        const response = await request(server.app).get('/api/usuarios/'+UserId).set({'Authorization':token}).send();
        expect(response.statusCode).toBe(200);
    });

    test('Comprobar PUT /api/usuarios/:id', async() =>{
        const response = await request(server.app).put('/api/usuarios/'+UserId).set({'Authorization':token})
        .send({
            "email" : "PruebaU@gmail.com"
        });
        expect(response.statusCode).toBe(200);
    });

    test('Comprobar Delete /api/usuarios/:id', async() =>{
        const response = await request(server.app).delete('/api/usuarios/'+UserId).set({'Authorization':token})
        .send();
        expect(response.statusCode).toBe(200);
    })

});


describe('Test a ruta /api/tickets', () =>{

    let TicketId;

       test('Comprobando GET /api/tickets',async() =>{
            const response = await request(server.app).get('/api/tickets').set({'Authorization':token})
            .send();
            expect(response.statusCode).toBe(200);
        });


        test('Comprobando POST /api/tickets',async() =>{
            const response = await request(server.app).post('/api/tickets').set({'Authorization':token})
            .send({
            "titulo": " Test del Post Ticket",
            "descripcion" : " Test del post y el Put",
            "estatus" : "pendiente"
            });
            TicketId = response.body.ticket.id;
            expect(response.statusCode).toBe(200);
        });

        test('Comprobando GET /api/tickets/:id', async() =>{
            const response = await request(server.app).get('/api/tickets/'+TicketId).set({'Authorization':token}).send();
            expect(response.statusCode).toBe(200);
        });
    

        test('Comprobar PUT /api/tickets/:id', async() =>{
            const response = await request(server.app).put('/api/tickets/'+TicketId).set({'Authorization':token})
            .send({
                "estatus" : "Proceso"
            });
            expect(response.statusCode).toBe(200);
        });

        test('Comprobando POST /api/tickets/:id',async() =>{
            const response = await request(server.app).post('/api/tickets').set({'Authorization':token})
            .send({
            "titulo": " Test del Post y Delete ticket",
            "descripcion" : " Test del Post y Delete ticket",
            "estatus" : "Finalizado"
            });
            TicketId = response.body.ticket.id;
            expect(response.statusCode).toBe(200);
        });
    
        test('Comprobar Delete /api/tickets/:id', async() =>{
            const response = await request(server.app).delete('/api/tickets/'+TicketId).set({'Authorization':token})
            .send();
            expect(response.statusCode).toBe(200);
        })
        

})


