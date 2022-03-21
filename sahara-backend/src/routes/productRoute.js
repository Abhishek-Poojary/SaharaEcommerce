const express=require("express");
const { addProduct } = require("../controllers/productController");
const { userAuthentication } = require("../middleware/authenticate");
const router= express.Router();


router.route("/admin/product/new").post(userAuthentication,addProduct);


module.exports=router