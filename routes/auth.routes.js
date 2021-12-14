const { Router } = require("express");
const { User } = require("../models");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const e = require("express");
const router = Router();

// /api/auth/register
module.export = router.post("/register",
    [
        check("email", "worng email").isEmail(),
        check("password", "Minimum password length 6 characters")
            .isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            console.log("__________________________2______________________________");
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Wrong data"
                })
            }
            console.log("__________________________3______________________________");
            const { email, password } = req.body;
            console.log("__________________________4______________________________");
            console.log(email, password);
            const candidate = await User.findOne({ where: { email } });
            console.log(candidate);

            if (candidate) {
                return res.status(400).json("Such user already exists");
            }
            console.log("__________________________5______________________________");
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({ email: email, password: hashedPassword })

            await user.save();
            res.status(201).json({ message: "User was created" });
        } catch (err) {
            res.status(500).json({ message: "Something was wrong, try again" });
        }

    })

// /api/auth/login
router.post("/login", async (req, res) => {

})

module.exports = router;