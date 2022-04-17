const { Schema, model } = require('mongoose');

const favoritoSchema = new Schema(
  {
    idCorePersona: {
      type: String,
      required: true,
    },
    nombre: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
    },
    observacion: {
      type: String,
    },
    estado: {
      type: String,
    },
    fechaCreacion: {
      type: Date,
    },
    fechaModificacion: {
      type: Date,
    },
    idUsuarioCreacion: {
      type: Number,
    },
    idUsuarioModificacion: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);
const Favorito = model('Favorito', favoritoSchema);

module.exports = Favorito;
