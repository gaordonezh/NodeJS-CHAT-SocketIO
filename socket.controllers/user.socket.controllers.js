const User = require("../models/User");

exports.getUsers = async () => {
  try {
    const data = await User.find();
    return data;
  } catch (error) {
    return [];
  }
};
