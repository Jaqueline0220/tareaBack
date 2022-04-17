const { z } = require('zod');

const { validate } = require('../middlewares');

const bodySchema = z.object({
  nombre: z.string().min(1),
  correo: z.string().email(),
  contrasenia: z.string().min(8),
  usuario: z.string().email(),
});

const create = validate(
  z.object({
    body: bodySchema,
  }),
);

const update = validate(
  z.object({
    body: bodySchema.partial(),
  }),
);

module.exports = {
  create,
  update,
};
