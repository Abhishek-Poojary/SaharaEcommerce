const express=require("express");
const { addProduct, getAllProducts, getProductByTags,
     getSingleProductDetail, updateProduct, deleteProduct, getAllProductAdmin } = require("../controllers/productController");
const { userAuthentication, roleAuthentication } = require("../middleware/authenticate");
const router= express.Router();


router.route("/admin/product/new").post(userAuthentication,addProduct);

router.route("/admin/product/all").get(userAuthentication,roleAuthentication("admin"),getAllProductAdmin);

router.route("/products/all").get(getAllProducts);

router.route("/products/tag").get(getProductByTags);

router.route("/product/:id").get(getSingleProductDetail);

router.route("/admin/product/:id").put(userAuthentication,roleAuthentication("admin"),updateProduct)
.delete(userAuthentication,roleAuthentication("admin"),deleteProduct)


module.exports=router