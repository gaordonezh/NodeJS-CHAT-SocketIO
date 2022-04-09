const Message = require("../models/Message");

exports.getMessages = async (room) => {
  try {
    const messagesByRoom = await Message.find({ room });
    return messagesByRoom;
  } catch (error) {
    return false;
  }
};
