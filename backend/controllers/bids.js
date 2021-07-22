const activeBidsSchema = require("../models/openbids");
const bidsSchema = require("../models/bids");
const notificationSchema = require("../models/notifications");

module.exports = {
  create: function (req, res, next) {
    activeBidsSchema.create({
      ProjectAddress: req.body.ProjectAddress,
      OwnerAddress: req.body.OwnerAddress,
      StakeValue: req.body.StakeValue,
      MinimumBid: req.body.MinimumBid,
      UpUntil: req.body.UpUntil,
      ProjectName: req.body.ProjectName,
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
  getBidById: function (req, res, next) {
    activeBidsSchema.findById(req.params.id, function(err,result) {
      if(err) {
        next(err);
      }
      else {
        res.json(result);
      }
    })
  },
  getByAddress: function (req, res, next) {
    activeBidsSchema.find({OwnerAddress: req.params.id}, function(err,result) {
      if(err) {
        next(err);
      }
      else {
        res.json(result);
      }
    })
  },
  notify: function (req, res, next) {
    notificationSchema.create({
      Receiver: req.body.Receiver,
      OpenBidID: req.body.OpenBidID,
      BidValue: req.body.BidValue,
      SellerAddress: req.body.SellerAddress,
    },
      function(err, result) {
        if(err)
          next(err);
        else {
          res.json(result);
        }
    })
  },
  getNotified: function (req, res, next) {
    notificationSchema.find({Receiver: req.params.id}, function(err,result) {
      if(err) {
        next(err);
      }
      else {
        res.json(result);
      }
    })
  },

  deleteBids: function(req, res, next) {
    activeBidsSchema.findByIdAndRemove(req.params.id, function(err, result) {
        if(err) {
            next(err)
        } else {
            res.json({status: "success", message: "BID Campaign Deleted Successfully!!", data: result})
        }
    })
  },

  deleteBid: function(req, res, next) {
    activeBidsSchema.findByIdAndRemove(req.params.id, function(err, result) {
        if(err) {
            next(err)
        } else {
            res.json({status: "success", message: "BID Campaign Deleted Successfully!!", data: result})
        }
    })
  },

  deleteNotif: function(req, res, next) {
    notificationSchema.findByIdAndRemove(req.params.id, function(err, result) {
        if(err) {
            next(err)
        } else {
            res.json({status: "success", message: "Notification Deleted Successfully!!", data: result})
        }
    })
  },
}


/*
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
          notificationSchema.findOne({OpenBidID: req.body.BidID}, function(err, result2) {
            if(err) {
              next(err);
            }
            else if(result2) {
              res.json({ status: "success", message: "Bid Placed", data: result, notification: "Exists" })
            }
            else {
              notificationSchema.create({
                Type: "NewBid",
                OpenBidID: req.body.BidID,
                Receiver: 
              })
            } 
          })
          res.json({ status: "success", message: "Bid Placed", data: result })
        }
      }
    )
  },
*/