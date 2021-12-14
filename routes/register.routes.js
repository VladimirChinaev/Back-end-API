const { Router } = require("express");
const { User } = require("../models");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = Router();

// /api/register
module.export = router.post("/register",
    [
        check("email", "wrong email").isEmail(),
        check("password", "Minimum password length 6 characters")
            .isLength({ min: 6 })
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
            const candidate = await User.findOne({ where: { email } });
            if (candidate) {
                return res.status(400).json({ message: "Such user already exists" });
            }
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({ email: email, password: hashedPassword })

            await user.save();
            res.status(201).json({ message: "User was created" });
        } catch (err) {
            res.status(500).json({ message: "Something was wrong, try again" });
        }
    })

module.exports = router;