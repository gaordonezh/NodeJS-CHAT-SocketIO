const User = require("../models/User");

exports.getUsers = async (userId) => {
  try {
    const data = await User.find();
    const result = data.filter((usr) => usr._id.toString() !== userId);
    return result;
  } catch (error) {
    return [];
  }
};
