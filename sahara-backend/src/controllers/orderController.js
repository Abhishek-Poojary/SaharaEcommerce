const Order =require("../models/orderModel");
const catchasyncerror =require("../middleware/catchAsyncError");
const ErrorHandler=require("../utilities/ErrorHandler")
const Product=require("../models/productModel")

exports.placeOrder=catchasyncerror(async (req,res,next)=>{  //

    const order=await Order.create({...req.body,
        paidAt:Date.now(),
        user:req.user.id
    })
    

    res.status(200).json({
        success:true,
        order
    })
})


exports.getOrderDetails=catchasyncerror(async(req,res,next)=>{
    const order=await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Invalid Order Id",400));
    }

    res.status(200).json({
        success:true,
        order,
    })
})

exports.loggedInUserOrders=catchasyncerror(async(req,res,next)=>{
    const order=await Order.find({user:req.user.id});

    res.status(200).json({
        success:true,
        order
    });

});


exports.getAllOrders=catchasyncerror(async(req,res,next)=>{
    const order=await Order.find();

    let total=0;

    order.forEach((value)=>{
        total+=value.totalPrice
    })

    res.status(200).json({
        success:true,
        total,
        order
    });
})


exports.updateOrder=catchasyncerror(async(req,res,next)=>{
    const order=await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Invalid Order Id",400));
    }

    if(order.orderStatus==="Delivered"){
        return next(new ErrorHander("order already delivered", 400));
    }

    if(req.body.status==="Shipped"){
        order.orderItems.forEach(async(val)=>{
            await updateQuantity(val.product,val.quantity);
        })
    }

    order.orderStatus=req.body.status;

    if(order.orderStatus==="Delivered"){
        order.deliveredAt=Date.now();
    }

    await order.save({validateBeforeSave: false});

    res.status(200).json({
        success:true,
        orderStatus:order.orderStatus
    })

})

async function updateQuantity(id,quantity){
    const product=await Product.findById(id);

    product.inStock-=quantity;

    return await product.save({validateBeforeSave: false});

}


exports.deleteOrder=catchasyncerror(async(req,res,next)=>{
    const order=await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Invalid Order Id",400));
    }

    await order.remove();

    res.status(200).json({
        success:true,
        message:"Order deleted"
    })


})