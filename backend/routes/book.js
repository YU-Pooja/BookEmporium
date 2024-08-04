const router = require('express').Router();
const User = require('../models/user')
// const jwt = require('jsonwebtoken')
const Book = require("../models/book")
const { authenticateToken } = require('./userAuth')

//add book ..admin
router.post("/add-book", authenticateToken, async (req, res) => {
    try {
        const { url, title, author, price, desc, language } = req.body;
        const { id } = req.headers;
        const user = await User.findById(id);
        console.log(user.role);
        if (user.role !== 'admin') {
            return res.status(200).json({ message: "Sorry!,Only admin can perform this action" })
        }
        const dataPush = new Book({ url, title, author, price, desc, language })
        await dataPush.save();
        res.status(200).json({ message: "Book data created successfully" })
    } catch (err) {
        res.status(500).json({ message: err });
    }
})

router.put("/update-book", authenticateToken, async (req, res) => {
    try {
        const { url, title, author, price, desc, language } = req.body;
        const { bookid } = req.headers;
        await Book.findByIdAndUpdate(bookid, { url, title, author, price, desc, language });
        res.status(200).json({ message: "Book data updaates successfully" })
    } catch (err) {
        res.status(500).json({ message: err });
    }
})

router.delete("/delete-book", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndDelete(bookid);
        res.status(200).json({ message: "Book data deleted successfully" })
    } catch (err) {
        res.status(500).json({ message: err });
    }
})

router.get("/get-all-book", async (req, res) => {
    try {
        const dataget = await Book.find().sort({ createdAt: -1 });
        console.log(dataget);
        return res.status(200).json({ status: "success", data: dataget });
    } catch (err) {
        res.status(500).json({ message: "Invalid" })
    }
})

router.get("/get-recently-book", async (req, res) => {
    try {
        const dataget = await Book.find().sort({ createdAt: -1 }).limit(2);
        console.log(dataget);
        return res.status(200).json({ status: "success", data: dataget });
    } catch (err) {
        res.status(500).json({ message: "Invalid" })
    }
})

router.get("/get-book-by-id/:bookid", async (req, res) => {
    try {
        const { bookid } = req.params;
        const dataget = await Book.findById(bookid);
        return res.status(200).json({ status: "success", data: dataget });
    } catch (err) {
        res.status(500).json({ message: "Invalid" })
    }
})

module.exports = router;