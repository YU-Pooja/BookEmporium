const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./conn/connectingDB")
const bodyparser = require('body-parser')
const userRoutee = require("./routes/user")
const BooksRoutee = require("./routes/book");
const FavouriteRoutee = require("./routes/favourite")
const CartRoutee = require("./routes/caart")
const OrderRoutee = require("./models/order")

app.use(cors());
app.use(bodyparser.json());
app.use('/posting',userRoutee);
app.use('/book',BooksRoutee);
app.use('/favbook',FavouriteRoutee)
app.use('/cart',CartRoutee)
app.use('/order',OrderRoutee)

app.get("/",(req,res)=>{
res.status(200).json("I am from route")
})



app.listen(process.env.PORT,(err)=>{
    if(err){
        console.log("---------------"+err);
    }
    console.log(`up and runnidfng http://localhost:${process.env.PORT} `)
})


