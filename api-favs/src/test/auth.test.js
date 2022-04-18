const request = require('supertest');
const { app } = require('../app');
const { connectDB } = require('../config/database');
/* eslint-disable */
const login = {
  usuario: 'jaky_202_@hotmail.com',
  contrasenia: '12@4567.'
}

const usuario = {
  usuario: 'jaky_202_@hotmail.com',
  contrasenia: '12@4567.',
  nombre: 'Matta Angel',
  apellidoPaterno: 'Sonny',
  apellidoMaterno: 'Barrientos',
  correo: 'jaky_202_@hotmail.com',
  direccion: 'los rosales de pro Mz p1 lt 19',
  celular: '90291656',
  nroDocumento: '11422003',
  estado: 'A',
  fechaCreacion: '2022-03-07T06:30:27.128Z',
  fechaModificacion: '2022-03-07T06:30:27.128Z',
  idUsuarioCreacion: 1,
  idUsuarioModificacion: 1
}


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
  })

  it('should create a new post', async () => {
    const res = await request(app)
      .post('/api/v1/auth')
      .send(usuario)
    expect(res.statusCode).toEqual(400)
    expect(res.body.errors.message).toEqual('El numero de documento ya existe.');
  })
})
