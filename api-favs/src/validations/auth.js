const { z } = require('zod');

const { validate } = require('../middlewares');

const signIn = validate(
  z.object({
    body: z.object({
      email: z.string().email(),
      password: z.string().min(8),
    }),
  }),
);

const signUp = validate(
  z.object({
    body: z.object({
      name: z.string().min(1),
      email: z.string().email(),
      password: z.string().min(8),
    }),
  }),
);

module.exports = {
  signIn,
  signUp,
};
