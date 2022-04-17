const env = require('./env');
const database = require('./database');

module.exports = {
  ...database,
  ...env,
};
