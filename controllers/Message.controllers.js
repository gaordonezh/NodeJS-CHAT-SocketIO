const Message = require("../models/Message");

exports.getMessages = async (req, res) => {
  try {
    const { room } = req.params;
    const data = await Message.find({ room });
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ error });
  }
};
