const userModel = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  create: function (req, res, next) {
    userModel.findOne({ email: req.body.email }, function (error, userInfo) {
      if (error) {
        next(error)
      } else if (userInfo) {
        res.json({ status: "failed", message: "Email already Exists!" })
      } else {
        userModel.findOne({ address: req.body.address }, function (error, userInfo) {
          if (error) {
            next(error)
          } else if (userInfo) {
            res.json({ status: "failed", message: "Account Address already Exists!" })
          } else {
            userModel.create({ name: req.body.name, email: req.body.email, password: req.body.password, address: req.body.address }, function (err, result) {
              if (err) {
                next(err)
              } else {
                res.json({ status: "success", message: "User Registered Successfully", data: null })
              }
            })
          }
        })
      }
    })
  },
  authenticate: function (req, res, next) {
    userModel.findOne({ email: req.body.email }, function (err, userInfo) {
      if (err) {
        next(err);
      } else if (userInfo) {
        //res.json(userInfo)
        if (bcrypt.compareSync(req.body.password, userInfo.password)) {
          // const token = jwt.sign({ id: userInfo._id}, process.env.JWT_KEY, { expiresIn: '10h' });
          res.json({ status: "success", message: "User found!!", user: userInfo });
        } else {
          res.json({ status: "error", message: "Invalid Password", data: null });
        }
      }
      else {
        res.json({ status: "error", message: "Invalid Username", data: null });
      }
    })
  },
  getDetails: function (req, res, next) {
    userModel.findById(req.params.id, function (err, userInfo) {
      if (err) {
        next(err)
      }
      else {
        res.json(userInfo);
      }
    })
  }
}