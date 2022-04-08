const Order = require("../models/orderModel");
const catchasyncerror = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utilities/ErrorHandler")
const Product = require("../models/productModel")

exports.placeOrder = catchasyncerror(async (req, res, next) => {  //

    const order = await Order.create({
        ...req.body,
        paidAt: Date.now(),
        user: req.user.id
    })

    order.orderItems.forEach(async (val) => {
        await updateQuantity(val.product, val.quantity);
    })


    res.status(200).json({
        success: true,
        order
    })
})

async function updateQuantity(id, quantity) {
    const product = await Product.findById(id);

    product.inStock -= quantity;

    return await product.save({ validateBeforeSave: false });

}

exports.getOrderDetails = catchasyncerror(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Invalid Order Id", 400));
    }

    res.status(200).json({
        success: true,
        order,
    })
})

exports.loggedInUserOrders = catchasyncerror(async (req, res, next) => {
    const order = await Order.find({ user: req.user.id });

    res.status(200).json({
        success: true,
        order
    });

});


exports.getAllOrders = catchasyncerror(async (req, res, next) => {
    const order = await Order.find();


    res.status(200).json({
        success: true,
        order
    });
})


exports.updateOrder = catchasyncerror(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Invalid Order Id", 400));
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHander("order already delivered", 400));
    }

    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        orderStatus: order.orderStatus
    })

})


exports.deleteOrder = catchasyncerror(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Invalid Order Id", 400));
    }

    await order.remove();

    res.status(200).json({
        success: true,
        message: "Order deleted"
    })


})