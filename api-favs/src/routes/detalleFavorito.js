const { Router } = require('express');

const controller = require('../controllers/detalleFavorito');
const { checkJwt } = require('../middlewares');

/** @type {import('express').Router} */
const router = Router();

router.use(checkJwt);
router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
