const activeBidsSchema = require("../models/openbids");
const bidsSchema = require("../models/bids");

module.exports = {
  create: function (req, res, next) {
    activeBidsSchema.create({
      ProjectAddress: req.body.ProjectAddress,
      OwnerAddress: req.body.OwnerAddress,
      StakeValue: req.body.StakeValue,
      MinimumBid: req.body.MinimumBid,
      UpUntil: req.body.UpUntil,
    },
      function (error, result) {
        if (error) {
          next(error)
        } else {
          res.json({ status: "success", message: "Project Created", data: result })
        }
      }
    )
  },
  bid: function (req, res, next) {
    bidsSchema.create({
      BidID: req.body.BidID,
      BidderAddress: req.body.BidderAddress,
      BidValue: req.body.BidValue,
    },
      function (error, result) {
        if (error) {
          next(error)
        } else {
          res.json({ status: "success", message: "Bid Placed", data: result })
        }
      }
    )
  },
  getAllBids: function (req, res, next) {
    bidsSchema.find({BidID: req.params.id}, function(err,result) {
      if(err) {
        next(err);
      }
      else {
        res.json(result);
      }
    })
  },
  getAllActiveBids: function (req, res, next) {
    activeBidsSchema.find({}, function(err,result) {
      if(err) {
        next(err);
      }
      else {
        res.json(result);
      }
    })
  },
}