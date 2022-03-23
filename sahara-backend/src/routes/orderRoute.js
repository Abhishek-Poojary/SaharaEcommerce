const express=require("express");
const { placeOrder, getOrderDetails, loggedInUserOrders, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderController");
const {userAuthentication,roleAuthentication} =require("../middleware/authenticate")
const router =express.Router();


router.route("/order/new").post(userAuthentication,placeOrder);

router.route("/order/:id").get(userAuthentication,getOrderDetails);

router.route("/orders/me").get(userAuthentication, loggedInUserOrders);


router.route("/admin/orders").get(userAuthentication,roleAuthentication("admin"), getAllOrders);

router.route("/admin/order/:id")
.put(userAuthentication,roleAuthentication("admin"),updateOrder)
.delete(userAuthentication,roleAuthentication("admin"),deleteOrder);



module.exports=router;