const router = require("express").Router();
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @route   POST /api/users
// @desc    Register user
// @access  Public
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "This email already registered." });

    const passwordHashed = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: passwordHashed,
    });

    await newUser.save();

    jwt.sign(
      { id: newUser.id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "20m",
      },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ token });
      }
    );
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
