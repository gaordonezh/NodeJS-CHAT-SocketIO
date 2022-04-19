const { Router } = require("express");
const { checkToken } = require("../middlewares/AuthValidactions");
const { createRoom } = require("../controllers/Room.controllers");

const router = Router();
router.use(checkToken);

router.post("/", createRoom);

module.exports = router;
