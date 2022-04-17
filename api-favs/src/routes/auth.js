const { Router } = require('express');

const controller = require('../controllers/auth');
const controllerPersona = require('../controllers/corePersona');
const validation = require('../validations/corePersona');
/** @type {import('express').Router} */
const router = Router();

router.post('/local/login', controller.signIn);
router.post('/', validation.create, controllerPersona.create);
module.exports = router;
