const express=require("express");
const { createUser, logoutUser, userLogin } = require("../controllers/userController");

const router=express.Router();


router.route("/user/register").post(createUser);
router.route("/login").post(userLogin);
router.route("/logout").get(logoutUser);

module.exports=router;