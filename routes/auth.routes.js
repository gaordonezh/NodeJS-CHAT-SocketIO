const { Router } = require("express");
const { signUp, signIn, userInfo } = require("../controllers/Auth.controllers");
const router = Router();

router.post("/signin", signIn);
router.post("/signup", signUp);
router.get("/userinfo", userInfo);

module.exports = router;
