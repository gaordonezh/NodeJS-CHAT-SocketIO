const Message = require("../models/Message");

exports.getMessages = async (req, res) => {
  try {
    const { from, to } = req.body;
    const data = await Message.find({ from, to });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ err: "error" });
  }
};
