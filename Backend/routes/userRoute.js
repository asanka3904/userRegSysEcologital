const express = require("express");
const router = express.Router();

const userControll = require("../controllers/userController");
const auth = require("../config/auth");

router.post("/register", userControll.register);
router.post("/login", userControll.signIn);
router.get("/profile", auth, userControll.userDetail);
router.get("/detail/:id", auth, userControll.getuserDetailbyId);
router.put("/detail/:id", auth, userControll.updateUserDetailbyId);
router.delete("/detail/:id", auth, userControll.deleteUserDetailbyId);

module.exports = router;
