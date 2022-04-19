const Message = require("../models/Message");

exports.createMessage = async (data) => {
  try {
    await Message(data).save();
    const result = await Message.find({ room: data.room });
    return result;
  } catch (error) {
    return [];
  }
};
