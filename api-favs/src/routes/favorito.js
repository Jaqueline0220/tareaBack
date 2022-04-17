const { Router } = require('express');

const controller = require('../controllers/favorito');
const { checkJwt } = require('../middlewares');

/** @type {import('express').Router} */
const router = Router();

router.use(checkJwt);
router.get('/favs', controller.getAll);
router.get('/favs/:id', controller.getOne);
router.post('/favs', controller.create);
router.put('/favs/:id', controller.update);
router.delete('/favs/:id', controller.remove);
router.get('/detalle/:id', controller.getfavoritos);

module.exports = router;
