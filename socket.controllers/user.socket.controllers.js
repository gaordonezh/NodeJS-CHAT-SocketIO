const User = require("../models/User");
const Room = require("../models/Room");

exports.getUsers = async (userId) => {
  try {
    const data = await User.find();
    const result = data.filter((usr) => usr._id.toString() !== userId);

    const rooms = await Room.find();
    const newRes = result.map((row) => {
      const room = rooms.find((item) => item.users.includes(row._id));
      delete row._doc.password;
      return { ...row._doc, room: room?._id ?? null };
    });

    return newRes;
  } catch (error) {
    return [];
  }
};
