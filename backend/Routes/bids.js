const express = require('express');
const router = express.Router();
const bidsController = require('../controllers/bids');

router.post('/create', bidsController.create);
router.get('/activebids', bidsController.getAllActiveBids);
router.post('/bid', bidsController.bid);
router.get('/allbids/:id', bidsController.getAllBids);

module.exports = router;