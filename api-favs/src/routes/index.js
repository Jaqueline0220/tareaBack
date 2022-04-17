const { Router } = require('express');
const { readdirSync } = require('fs');

/** @type {import('express').Router} */
const router = Router();

const ROUTER_PATH = `${__dirname}/`;

/** Get all routes in src/routes folder except index.js */
const routes = readdirSync(ROUTER_PATH).filter((file) => file !== 'index.js');

/** Load routes to router */
routes.forEach((file) => {
  const routeName = file.split('.')[0];
  const route = require(`./${routeName}`);
  router.use(`/${routeName}`, route);
});

// 404
router.use('*', (req, res) => {
  res.status(404).json({
    errors: {
      msg: 'URL_NOT_FOUND',
    },
  });
});

module.exports = router;
