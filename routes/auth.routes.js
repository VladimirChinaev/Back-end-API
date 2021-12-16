const { Router } = require("express");
const { User } = require("../models");
const { check, validationResult } = require("express-validator");
const config = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = Router();

// /api/login
module.export = router.post("/login",
    [
        check("email", "Write correct email").normalizeEmail().isEmail(),
        check("password", "Write correct password").exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Wrong data"
                })
            }
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(400).json({ message: "No such user found" });
            }
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: "Wrong password" })
            }
            const token = jwt.sign(
                { userId: user.id },
                process.env.jwtSecret,
                { expiresIn: '5h' }
            )
            res.json({ token, userId: user.id })
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Something was wrong, try again" });
        }

    })

module.exports = router;