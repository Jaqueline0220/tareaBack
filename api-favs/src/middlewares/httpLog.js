const morgan = require('morgan');
const { dim, cyan, green, blue, red, yellow, bold } = require('colorette');

const status = (status) => {
  if (status >= 500) return red(status);
  if (status >= 400) return yellow(status);
  if (status >= 300) return cyan(status);
  return green(status);
};

const method = (method) => {
  if (method === 'GET') return bold(blue(method));
  if (method === 'POST') return bold(green(method));
  if (method === 'PUT') return bold(yellow(method));
  if (method === 'PATCH') return bold(cyan(method));
  if (method === 'DELETE') return bold(red(method));
  return dim(method);
};

const httpLog = morgan((tokens, req, res) => {
  return [
    method(tokens.method(req, res)),
    dim(tokens.url(req, res)),
    status(tokens.status(req, res)),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms',
  ].join(' ');
});

module.exports = { httpLog };
