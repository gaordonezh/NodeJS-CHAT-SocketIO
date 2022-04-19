const Message = require("../models/Message");

exports.getMessages = async (req, res) => {
  try {
    const { from, to } = req.body;
    console.log(from, to);
    const data = await Message.find({ from, to });
    console.log(data)
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ err: "error" });
  }
};
