const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
    try {
        if (req.method === "OPTIONS") {
            return next();
        }
        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
            return res.status(403).send("A token is required for authentication");
        }

        const decoded = jwt.verify(token, config.jwtSecret);
        res.locals = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = verifyToken;