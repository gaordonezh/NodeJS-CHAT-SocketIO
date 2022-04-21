const Message = require("../models/Message");

exports.getMessages = async (req, res) => {
  try {
    const { room } = req.body;
    const data = await Message.find({ room });
    console.log(data,"-----");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ err: "error" });
  }
};
