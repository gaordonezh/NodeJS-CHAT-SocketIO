const { Router } = require("express");
const { checkToken } = require("../middlewares/AuthValidactions");

const router = Router();

router.use(checkToken);

module.exports = router;
