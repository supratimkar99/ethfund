const projectModel = require("../models/project");
const stakeModel = require("../models/stake");

module.exports = {
    create: function(req, res, next) {
        projectModel.create({ProjectName: req.body.ProjectName,
                        ProjectDesc: req.body.ProjectDesc,
                        Website: req.body.Website,
                        ProjectAddress: req.body.ProjectAddress },
        function(err, result) {
            if(err) {
                next(err)
            } else {
                
                stakeModel.create({ProjectAddress: req.body.ProjectAddress,
                                UserAddress: req.body.UserAddress,
                                ProjectTitle: req.body.ProjectName,
                                StakeValue: 100 },
                function(error, result2) {
                    if(error) {
                        next(error)
                    } else {
                        res.json({status: "success", message: "Project Created", data: result, data2: result2})
                    }
                })
            }
        })
    },
    list: function(req, res, next) {
        stakeModel.find({UserAddress: req.params.ac}, function(err,result) {
            if(err) {
                next(err);
            }
            else {
                res.json(result)
            }
        })
    },
    getDetails: function(req, res, next) {
        projectModel.findOne({ProjectAddress: req.params.id}, function(err,result) {
            if(err) {
                next(err);
            }
            else {
                res.json(result)
            }
        })
    },
    deleteStake: function(req, res, next) {
        stakeModel.findOneAndDelete({
            ProjectAddress: req.params.add,
            StakeValue: 100
        }, 
            function(err, result) {
                if(err) {
                    next(err);
                } else {
                    res.json({status: "success", message: "Stake upadted Successfully!!", data: result})
                }
            }
        )
    },
    newStake: function(req, res, next) {
        stakeModel.create({
            ProjectAddress: req.body.ProjectAddress,
            UserAddress: req.body.UserAddress,
            ProjectTitle: req.body.ProjectName,
            StakeValue: req.body.StakeValue
        },
        function(error, result) {
        if(error) {
            next(error)
        } else {
            res.json({status: "success", message: "Stake added successfully", data: result})
        }
        })
    },
}
    