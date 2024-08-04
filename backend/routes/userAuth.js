const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; //Bearer jfkhdjsfhjsdgbf

    if (token == null) {
        res.status(401).json({ message: "Authentication token is needed" });
    }

    jwt.verify(token, "bookStore123", (err, user) => {
        if (err) {
            res.status(403).json({ message: "Token expired.please signIn again" });
        }
        req.user = user;
        next();
    });
};

module.exports = { authenticateToken }