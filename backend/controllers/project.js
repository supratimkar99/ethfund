const projectModel = require("../models/project");
const stakeModel = require("../models/stake")

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
                
                stakeModel.create({ProjectAddress: result.ProjectAddress,
                                UserAddress: req.body.UserAdddress,
                                ProjectTitle: req.body.ProjectName },
                function(error, result2) {
                    if(error) {
                        next(error)
                    } else {
                        res.json({status: "success", message: "Project Created", data: result})
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
    update: function(req, res, next) {
        stakeModel.find({UserAddress: req.params.project}, function(err,result) {
            if(err) {
                next(err);
            }
            else {
                res.json(result)
            }
        })
    }
}
    