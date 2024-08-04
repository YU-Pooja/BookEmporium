const router = require('express').Router()
const User = require('../models/user')
const Book = require('../models/book')
const Order = require('../models/order')
const { authenticateToken } = require('./userAuth')

router.get('/place-order',authenticateToken,async(req,res)=>{
    try{
    const {id} = req.headers;
    const {order} = req.body;

    for(const orderData of order){
        const newOrder = new Order({user:id,book:orderData._id})
        const orderDataFromDB = await newOrder.save();
        //saving Order in user model
        await User.findByIdAndUpdate(id,{$push: { orders: orderDataFromDB._id}})
        //clearing cart
        await User.findByIdAndUpdate(id,{$pull:{cart:orderData._id}})
    }
    return res.status(200).json({status:"success",message:"Order placed successfully"})
    }catch(err){
        res.status(500).json({message:"Internal server error"})
    }
})

router.get('/get-order-history',authenticateToken,async(req,res)=>{
    try{
    const {id} = req.headers;
    const userData = await User.findById(id).populate({ 
        path:"orders",
        populate:{ path: "book"},
    })
    
    const ordersData = userData.orders.reverse();
    return res.status(200).json({status:"success",data:ordersData})
    }catch(err){
        res.status(500).json({message:"Internal server error"})
    }
})

router.get('/get-all-orders',authenticateToken,async(req,res)=>{
    try{
    const userData = await Order.find()
    .populate({path:"book"})
    .populate({path:"user"})
    .sort({createdAt: -1 });
    
    return res.status(200).json({status:"success",data:userData})
    }catch(err){
        res.status(500).json({message:"Internal server error"})
    }
})

//update order -- admin
router.get('/update-status/:id',authenticateToken,async(req,res)=>{
    try{
    const {id} = req.params;
    await Order.findByIdAndUpdate(id, { status: req.body.status });
    return res.status(200).json({status:"success",message:"Status Updates Successfully"})
    }catch(err){
        res.status(500).json({message:"Internal server error"})
    }
})

module.exports = router;

