const User = require("../models/User");

exports.getAllUsers = (req, res) => {
  User.find().exec((err, data) => {
    if (err) return res.status(400).json(err);
    res.status(200).json(data);
  });
};
