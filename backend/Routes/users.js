const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);
router.get('/:id', userController.getDetails);

module.exports = router;