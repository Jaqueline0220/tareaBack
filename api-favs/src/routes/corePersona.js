const { Router } = require('express');

const controller = require('../controllers/corePersona');
const validation = require('../validations/corePersona');
const { checkJwt } = require('../middlewares');

/** @type {import('express').Router} */
const router = Router();

router.use(checkJwt);
router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.put('/:id', validation.update, controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
