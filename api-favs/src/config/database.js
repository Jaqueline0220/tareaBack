const mongoose = require('mongoose');

const { env } = require('./env');

const connectDB = async () => {
  let dBstatus;

  const connect = async () => {
    try {
      await mongoose.connect(env.mongoose.uri, env.mongoose.options);
      dBstatus = 'Connect';
    } catch (err) {
      dBstatus = err;
    }
  };

  await connect();

  return { dBstatus };
};

module.exports = { connectDB };
