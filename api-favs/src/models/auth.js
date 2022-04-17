const { Schema, model } = require('mongoose');
const bycrypt = require('bcrypt');

const authSchema = new Schema(
  {
    idCorePersona: {
      type: String,
      required: true,
    },
    usuario: {
      type: String,
      required: true,
    },
    contrasenia: {
      type: String,
      required: true,
    },
    fechaInicioSesion: {
      type: Date,
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

authSchema.pre('save', async function (next) {
  if (!this.contrasenia && !this.isModified('contrasenia')) return next();
  const hashedPassword = await bycrypt.hash(this.contrasenia, 10);
  this.contrasenia = hashedPassword;
  next();
});

authSchema.methods.comparePassword = async function (contrasenia) {
  return await bycrypt.compare(contrasenia, this.contrasenia);
};

const Auth = model('Auth', authSchema);

module.exports = Auth;
