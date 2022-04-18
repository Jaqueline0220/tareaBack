/** @type {import('mongoose').Model} */
const CorePersona = require('../models/corePersona');
const { NotFoundException, BadRequestException } = require('../errors');
const Auth = require('../models/auth');
const mensaje = require('../helpers/mensajes');

const create = async (req, res, next) => {
  const { body } = req;
  try {
    const existingUser = await CorePersona.findOne({
      nroDocumento: body.nroDocumento,
    });
    if (existingUser)
      throw new BadRequestException(
        'El numero de documento ya existe.',
        'corePersona',
      );

    const existilogin = await Auth.findOne({ usuario: body.usuario });
    if (existilogin)
      throw new BadRequestException('El usuario ya existe', 'auth');

    const user = await CorePersona.create(body);
    const auth = {
      idCorePersona: user.id,
      usuario: body.usuario,
      contrasenia: body.contrasenia,
      fechaInicioSesion: body.fechaCreacion,
      fechaCreacion: body.fechaCreacion,
      fechaModificacion: body.fechaModificacion,
      idUsuarioCreacion: body.idUsuarioCreacion,
      idUsuarioModificacion: body.idUsuarioModificacion,
    };

    await Auth.create(auth);

    res.status(200).json({
      message: mensaje.registroCorrecto,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

const getAll = async (req, res, next) => {
  try {
    const users = await CorePersona.find();
    res.status(200).json({
      message: mensaje.listadoCorrecto,
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await CorePersona.findById(id);
    if (!user)
      throw new NotFoundException('Persona no encontrada', 'corePersona');
    res.status(200).json({
      message: mensaje.objetoEcontrado,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;

  try {
    const user = await CorePersona.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!user)
      throw new NotFoundException('Persona no encontrada', 'corePersona');
    res.status(200).json({
      message: mensaje.updateCorrecto,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await CorePersona.findByIdAndDelete(id);
    if (!user)
      throw new NotFoundException('Persona no encontrada', 'corePersona');
    res.status(200).json({
      message: mensaje.deleteCorrecto,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
};
