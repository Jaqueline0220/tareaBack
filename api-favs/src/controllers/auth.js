const jwt = require('jsonwebtoken');

const { BadRequestException, NotFoundException } = require('../errors');
const { env } = require('../config');

/** @type {import('mongoose').Model} */
const Auth = require('../models/auth');
const mensaje = require('../helpers/mensajes');
const signIn = async (req, res, next) => {
  const { body } = req;
  try {
    const user = await Auth.findOne({ usuario: body.usuario }).select(
      '+contrasenia',
    );
    if (!user) throw new NotFoundException(mensaje.loginUser, 'auth');
    body.id = user.id;
    const isValid = await user.comparePassword(body.contrasenia);
    if (!isValid) throw new BadRequestException(mensaje.loginUser, 'auth');
    const token = jwt.sign({ id: user._id }, env.jwt.secret, {
      expiresIn: env.jwt.expiresIn,
    });

    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

const signUp = async (req, res, next) => {
  const { body } = req;
  try {
    const existingUser = await Auth.findOne({ usuario: body.usuario });
    if (existingUser)
      throw new BadRequestException('Persona no encontrada', 'auth');
    const user = await Auth.create(body);
    const token = jwt.sign({ id: user._id }, env.jwt.secret, {
      expiresIn: env.jwt.expiresIn,
    });

    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

const updatePassword = async (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;

  try {
    const user = await Auth.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!user)
      throw new NotFoundException('Persona no encontrada', 'corePersona');
    res.status(200).json({
      message: 'Se actualizo correctamente',
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

const createAuth = async (req, res, next) => {
  const { body } = req;
  try {
    const existingUser = await Auth.findOne({ usuario: body.usuario });
    if (existingUser)
      throw new BadRequestException('El usuario ya existe', 'auth');

    const user = await Auth.create(body);
    res.status(200).json({
      message: 'Usuario create',
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signIn,
  signUp,
  updatePassword,
  createAuth,
};
