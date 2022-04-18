const request = require('supertest');
const { app } = require('../app');
const { connectDB } = require('../config/database');
/* eslint-disable */

const favs = {
    "idCorePersona": "625b8574962ef535878dcfd4",
    "nombre": "Regueton",
    "descripcion": "Old School",
    "observacion": "de la vieja escuela",
    "estado": "A",
    "fechaCreacion": "2022-03-07T06:30:27.128Z",
    "fechaModificacion": "2022-03-07T06:30:27.128Z",
    "idUsuarioCreacion": 1,
    "idUsuarioModificacion": 1
}

const getfavs = {
    "message": "Se obtuvo correctamente",
    "data": {
        "_id": "625b966331a74cac63aa48e1",
        "idCorePersona": "625b8574962ef535878dcfd4",
        "nombre": "Regueton Old school",
        "descripcion": "Don omar",
        "observacion": "de la vieja escuela",
        "estado": "A",
        "fechaCreacion": "2022-03-07T06:30:27.128Z",
        "fechaModificacion": "2022-03-07T06:30:27.128Z",
        "idUsuarioCreacion": 1,
        "idUsuarioModificacion": 1,
        "createdAt": "2022-04-17T04:24:03.413Z",
        "updatedAt": "2022-04-17T04:35:16.057Z",
        "__v": 0
    }
}

const login = {
    usuario: 'jaky_202_@hotmail.com',
    contrasenia: '12@4567.'
  }

let token;
describe('Post Endpoints', () => {
  beforeAll(async () => {
    await connectDB();
  });

  it('should create a new post', async () => {
    const res = await request(app)
      .post('/api/v1/auth/local/login')
      .send(login)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  })

  it('should create a new post', async () => {
    const res = await request(app)
      .post('/api/v1/favorito/favs')
      .send(favs)
      .set('Authorization', `Bearer ${token}`)
    expect(res.statusCode).toEqual(200)
    expect(res.body.data).toHaveProperty('_id');
  })

  it('should create a new post', async () => {
    const res = await request(app)
      .get('/api/v1/favorito/favs/625b966331a74cac63aa48e1')
      .set('Authorization', `Bearer ${token}`)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(getfavs);
  })

})
