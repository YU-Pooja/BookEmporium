const router = require('express').Router();
const User = require('../models/user');
// const Book = require('../models/book');
const { authenticateToken } = require('./userAuth');

//add book to favourites
//NOTE:- bookid = Id of book, id= Do signin as user there your will get the id and token add those 2 in the header
router.put('/add-book-to-favourite',authenticateToken,async(req,res)=>{
    try{
     const {bookid,id} = req.headers;
     const useData = await User.findById(id);
     const isBookFavourites = useData.favourites.includes(bookid);
     if(isBookFavourites){
        return res.status(200).json({message:"Book is alredy in the fav"})
     }
     await User.findByIdAndUpdate(id,{ $push: { favourites:bookid }})
     return res.status(200).json({message:"Book is added to fav"})
    }catch(err){
        res.status(500).json({message:"Internal server error"})
    }
})


//delet from fav
router.delete('/delete-book-to-favourite',authenticateToken,async(req,res)=>{
    try{
     const {bookid,id} = req.headers;
     const useData = await User.findById(id);
     const isBookFavourites = useData.favourites.includes(bookid);
     if(!isBookFavourites){
        return res.status(200).json({message:"Book is not present to remove from fav"})
     }
     await User.findByIdAndUpdate(id,{ $pull: { favourites:bookid }})
     return res.status(200).json({message:"Book is removed from fav"})
    }catch(err){
        res.status(500).json({message:"Internal server error"})
    }
})

//fech the fav book list of particular user 
router.get('/get-favourite-book',authenticateToken,async(req,res)=>{
    try{
     const {id} = req.headers;
     const useData = await User.findById(id).populate("favourites");
     console.log(useData.favourites);
     return res.status(200).json({message:useData})
    }catch(err){
        res.status(500).json({message:"Internal server error"})
    }
})

module.exports = router;