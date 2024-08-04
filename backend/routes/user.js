
const router = require('express').Router();
const User = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { authenticateToken } = require('./userAuth')

router.post('/sign-up', async (req, res) => {
    try {
        const { username, email, password, address } = req.body;
        if (username.length < 4) {
            return res.status(400).json({ message: "Invalied length for username" });
        }

        const ExistingUser = await User.findOne({ username: username });
        if (ExistingUser) {
            return res.status(200).json({ message: "user alredy exist" });
        }

        const ExistingEmail = await User.findOne({ email: email });
        if (ExistingEmail) {
            return res.status(200).json({ message: "email alredy exist" });
        }

        if (password.length <= 4) {
            return res.status(400).json({ message: "Password should be greated then 5" });
        }

        const envryptedPassword = await bcrypt.hash(password, 0);
        const datapush = new User({ username, email, password: envryptedPassword, address });
        await datapush.save();
        return res.status(200).json("done");
    } catch (err) {
        res.status(500).json("error in signingin");
    }
})

router.get('/sign-in', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existUser = await User.findOne({ username: username })
        if (!existUser) {
            return res.status(200).json({ message: "plz sign up/User not found" })
        }
        await bcrypt.compare(password, existUser.password, (err, data) => {
            if (data) {
                const authClaims = [
                    { name: existUser.username },
                    { role: existUser.role }
                ];
                const token = jwt.sign({ authClaims }, "bookStore123", { expiresIn: "30d" });
                return res.status(200).json({ id: existUser._id, role: existUser.role, token: token })
            } else {
                return res.status(200).json({ message: "incorrect password" })
            }
        })
    } catch (err) {
        res.status(500).json({ message: err });
    }
})

router.get('/get-user-information', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const data = await User.findById(id).select("-password");
        return res.status(200).json(data)

    } catch (err) {
        res.status(500).json({ message: err });
    }
})

router.put('/update-address', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { address } = req.body;
        const gg = await User.findByIdAndUpdate(id, { address: address }, { new: true, runValidators: true });
        console.log(gg)
        return res.status(200).json({ message: "address updates successfully" });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
})

module.exports = router;