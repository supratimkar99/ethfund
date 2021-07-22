const express = require('express');
const router = express.Router();
const bidsController = require('../controllers/bids');

router.post('/create', bidsController.create);
router.get('/activebids', bidsController.getAllActiveBids);
router.post('/bid', bidsController.bid);
router.get('/allbids/:id', bidsController.getAllBids);
router.get('/getbyaddress/:id', bidsController.getByAddress);
router.post('/notify', bidsController.notify);
router.get('/getnotified/:id', bidsController.getNotified);
router.delete('/deletebid/:id', bidsController.deleteBid);
router.delete('/deletenotif/:id', bidsController.deleteNotif);
router.get('/getbidbyid/:id', bidsController.getBidById);

module.exports = router;