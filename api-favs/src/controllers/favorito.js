/** @type {import('mongoose').Model} */
const Favorito = require('../models/favorito');
const DetalleFavorito = require('../models/detalleFavorito');
const mensaje = require('../helpers/mensajes');
const { NotFoundException } = require('../errors');

const create = async (req, res, next) => {
  const { body } = req;
  try {
    const trol = await Favorito.create(body);
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
    const trol = await Favorito.find();
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
    const trol = await Favorito.findById(id);
    if (!trol) throw new NotFoundException(mensaje.sinresultados, 'favorito');
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
    const trol = await Favorito.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!trol) throw new NotFoundException(mensaje.sinresultados, 'favorito');
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
    const trol = await Favorito.findByIdAndDelete(id);
    if (!trol) throw new NotFoundException(mensaje.sinresultados, 'favorito');
    res.status(200).json({
      message: mensaje.deleteCorrecto,
      data: trol,
    });
  } catch (err) {
    next(err);
  }
};

const getfavoritos = async (req, res, next) => {
  const { id } = req.params;
  try {
    const list = await Favorito.findOne({ idCorePersona: id });
    const elemtos = await DetalleFavorito.find({ idFavorito: list.id });
    if (!list) throw new NotFoundException(mensaje.sinresultados, 'favorito');
    res.status(200).json({
      message: mensaje.objetoEcontrado,
      lista: list,
      elementos: elemtos,
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
  getfavoritos,
};
