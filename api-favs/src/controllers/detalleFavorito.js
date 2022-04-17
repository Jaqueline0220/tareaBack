/** @type {import('mongoose').Model} */
const DetalleFavorito = require('../models/detalleFavorito');
const mensaje = require('../helpers/mensajes');
const { NotFoundException } = require('../errors');

const create = async (req, res, next) => {
  const { body } = req;
  try {
    const trol = await DetalleFavorito.create(body);
    res.status(200).json({
      message: mensaje.registroCorrecto,
      data: trol,
    });
  } catch (err) {
    next(err);
  }
};

const getAll = async (req, res, next) => {
  try {
    const trol = await DetalleFavorito.find();
    res.status(200).json({
      message: mensaje.listadoCorrecto,
      data: trol,
    });
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    const trol = await DetalleFavorito.findById(id);
    if (!trol)
      throw new NotFoundException(mensaje.sinresultados, 'detalleFavorito');
    res.status(200).json({
      message: mensaje.objetoEcontrado,
      data: trol,
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
    const trol = await DetalleFavorito.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!trol)
      throw new NotFoundException(mensaje.sinresultados, 'detalleFavorito');
    res.status(200).json({
      message: mensaje.updateCorrecto,
      data: trol,
    });
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    const trol = await DetalleFavorito.findByIdAndDelete(id);
    if (!trol)
      throw new NotFoundException(mensaje.sinresultados, 'detalleFavorito');
    res.status(200).json({
      message: mensaje.deleteCorrecto,
      data: trol,
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
