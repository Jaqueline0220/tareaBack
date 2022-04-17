const { Schema, model } = require('mongoose');

const corePersonaSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    apellidoPaterno: {
      type: String,
      required: true,
    },
    apellidoMaterno: {
      type: String,
      required: true,
    },
    correo: {
      type: String,
      required: true,
    },
    direccion: {
      type: String,
      required: true,
    },
    celular: {
      type: String,
      required: true,
    },
    nroDocumento: {
      type: String,
      required: true,
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

const CorePersona = model('CorePersona', corePersonaSchema);

module.exports = CorePersona;
