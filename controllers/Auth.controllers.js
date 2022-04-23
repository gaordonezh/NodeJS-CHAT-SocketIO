const User = require("../models/User");
const Room = require("../models/Room");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  try {
    const objRoom = { name: `SALA DE ${req.body.f_name.toUpperCase()}` };

    const createRoom = new Room(objRoom);
    const newRoom = await createRoom.save();

    const objUser = {
      ...req.body,
      password: await User.encryptPassword(req.body.password),
      username: req.body.email,
      room: newRoom._id,
    };

    const createUser = new User(objUser);
    const newUser = await createUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY_JWT, {
      expiresIn: process.env.TOKEN_EXPIRATION_IN,
    });

    res.status(200).json({
      data: newUser.toJSON(),
      token,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.signIn = async (req, res) => {
  User.findOne({ username: req.body.username }).exec(async (err, findUsr) => {
    if (!findUsr) return res.status(400).json({ message: "User not found" });

    if (!findUsr.active) return res.status(400).json({ msg: "User disabled" });

    const matchPassword = await User.comparePassword(req.body.password, findUsr.password);

    if (!matchPassword) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: findUsr._id }, process.env.SECRET_KEY_JWT, {
      expiresIn: process.env.TOKEN_EXPIRATION_IN,
    });

    res.status(200).json({
      data: findUsr.toJSON(),
      token,
    });
  });
};

exports.userInfo = async (req, res) => {
  const token = req.headers.authorization;

  jwt.verify(token, process.env.SECRET_KEY_JWT, (err, decoded) => {
    if (err) return res.status(400).json({ err });

    User.findById(decoded.id).exec((error, user) => {
      if (err) return res.status(400).json({ error });
      res.status(200).json(user);
    });
  });
};
