const { Schema, model } = require('mongoose');

const detalleFavoritoSchema = new Schema(
  {
    idFavorito: {
      type: String,
      required: true,
    },
    titulo: {
      type: String,
      required: true,
    },
    descripción: {
      type: String,
    },
    enlace: {
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
const DetalleFavorito = model('DetalleFavorito', detalleFavoritoSchema);

module.exports = DetalleFavorito;
