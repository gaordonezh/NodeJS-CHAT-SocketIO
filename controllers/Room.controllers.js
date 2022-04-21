const Room = require("../models/Room");
const Message = require("../models/Message");

exports.createRoom = async (req, res) => {
  try {
    const { name, sender, users } = req.body;
    const data = await Room({ name, users }).save();

    const dataMessage = {
      sender,
      room: data._id,
      content: "initial_message",
      active: false,
    };

    await Message(dataMessage).save();

    res.status(200).send(data);
  } catch (error) {
    res.status(400).json({ err: "error" });
  }
};
