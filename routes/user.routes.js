const { Router } = require("express");
const { getAllUsers } = require("../controllers/User.controllers");

const router = Router();
//router.use(checkToken);

router.get("/", getAllUsers);

module.exports = router;
