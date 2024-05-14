
const express = require('express');
const router = express();

const userController = require('../controllers/userController');

router.get('/', userController.mostrar);

module.exports = router;