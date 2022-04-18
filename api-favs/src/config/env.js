require('dotenv').config();
const { z } = require('zod');

const { log } = require('../helpers/logger');

const envSchema = z.object({
  PORT: z.preprocess((n) => parseInt(n, 10), z.number()).default(4000),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  MONGO_NAME: z.string(),
  MONGO_USER: z.string(),
  MONGO_PASS: z.string(),
  MONGO_HOST: z.string(),
  MONGO_PORT: z.preprocess((n) => parseInt(n, 10), z.number()).default(27017),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string(),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  const { errors } = result.error;
  errors.forEach((e) => {
    log.error(`${e.path} [${e.message}]`, 'env');
  });
  process.exit(1);
}

const { data } = result;

const env = {
  port: data.PORT,
  env: data.NODE_ENV,
  mongoose: {
    uri: `mongodb://${data.MONGO_USER}:${data.MONGO_PASS}@${data.MONGO_HOST}:${data.MONGO_PORT}/${data.MONGO_NAME}`,
    options: {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: 'admin',
    },
  },
  jwt: {
    secret: data.JWT_SECRET,
    expiresIn: data.JWT_EXPIRES_IN,
  },
};

module.exports = { env };
