const { Router } = require("express");
const { checkToken } = require("../middlewares/AuthValidactions");
const { getMessages } = require("../controllers/Message.controllers")

const router = Router();
router.use(checkToken);

router.get("/:room", getMessages);

module.exports = router;
