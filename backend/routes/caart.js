const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require('./userAuth')

router.put('/add-book-to-cart',authenticateToken,async(req,res)=>{
    try{
     const {bookid,id} = req.headers;
     const useData = await User.findById(id);
     const isBookFavourites = useData.cart.includes(bookid);
     if(isBookFavourites){
        return res.status(200).json({message:"Book is alredy in the cart"})
     }
     await User.findByIdAndUpdate(id,{ $push: { cart:bookid }})
     return res.status(200).json({message:"Book is added to cart"})
    }catch(err){
        res.status(500).json({message:"Internal server error"})
    }
})

router.put('/remove-book-from-cart/:bookid',authenticateToken,async(req,res)=>{
    try{
     const {bookid} = req.params;
     const {id} = req.headers;
     await User.findByIdAndUpdate(id,{ $pull: { cart:bookid }})
     return res.status(200).json({message:"Book is removed from cart"})
    }catch(err){
        res.status(500).json({message:"Internal server error"})
    }
})

//get cart of a particular user
router.get('/get-user-cart',authenticateToken,async(req,res)=>{
    try{
     const {id} = req.headers;
     const userData = await User.findById(id).populate("cart");
     const cart = userData.cart.reverse();

     console.log(userData.cart);
     return res.status(200).json({status:"success",data:cart})
    }catch(err){
        res.status(500).json({message:"Internal server error"})
    }
})
module.exports = router;