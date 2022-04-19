const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

exports.checkToken = (req, res, next) => {
  const { authorization: token } = req.headers;

  jwt.verify(token, process.env.SECRET_KEY_JWT, (err, decoded) => {
    if (err) return res.status(400).json({ msg: "El token de autorización no es válido" });
    next();
  });
};
