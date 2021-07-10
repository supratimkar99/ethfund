const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project');

router.post('/create', projectController.create);
router.get('/list/:ac', projectController.list);
router.get('/details/:id', projectController.getDetails);

module.exports = router;