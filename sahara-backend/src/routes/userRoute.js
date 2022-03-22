const express=require("express");
const { createUser, logoutUser, userLogin,
     updatePassword, getLoggedInUserDetails, 
     updateUserProfile, getAllUsers, getSingleUserDetails,
      updateUserRole,deleteUser} = require("../controllers/userController");
const {userAuthentication, roleAuthentication }=require("../middleware/authenticate")


const router=express.Router();


router.route("/register").post(createUser);

router.route("/login").post(userLogin);

router.route("/logout").get(logoutUser);

router.route("/password/update").put(userAuthentication,updatePassword);

router.route("/profile/view").get(userAuthentication,getLoggedInUserDetails);

router.route("/profile/update").put(userAuthentication,updateUserProfile);

router.route("/admin/users/all").get(userAuthentication,roleAuthentication("admin"),getAllUsers);

router.route("/admin/users/:id")
.get(userAuthentication,roleAuthentication("admin"),getSingleUserDetails)
.put(userAuthentication,roleAuthentication("admin"),updateUserRole)
.delete(userAuthentication,roleAuthentication("admin"),deleteUser);

module.exports=router;