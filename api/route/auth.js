const router = require("express").Router();
const { response } = require("express");
const User = require("../models/User");
const cryptoJs = require("crypto-js");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
//register
router.post("/register", async (req, res, next) => {
  try {
    const doExist = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });
    if (doExist) throw createError.Conflict(`email or username already exist`);

    const newUser = new User({
      ...req.body,
      username: req.body.username,
      email: req.body.email,
      password: cryptoJs.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString(),
    });
    const user = await newUser.save();
    res.status(200).json({ status: "ohk" });
  } catch (err) {
    next(err);
  }
});
//login
router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) throw createError.NotFound("User Not register");

    const bytes = cryptoJs.AES.decrypt(user.password, process.env.SECRET_KEY);
    const OriginalPassword = bytes.toString(cryptoJs.enc.Utf8);

    if (OriginalPassword !== req.body.password)
      throw createError.Unauthorized("Username/password not valid");

    const { password, ...info } = user._doc;

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );
    res.status(200).json({ ...info, accessToken });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
