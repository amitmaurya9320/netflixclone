const router = require("express").Router();
const User = require("../models/User");
const cryptoJS = require("crypto-js");
const createError = require("http-errors");
const verify = require("../verifyToken");
//UPDATE
router.put("/:id", verify, async (req, res, next) => {
  try {
    if (!(req.user.id === req.params.id || req.user.isAdmin))
      throw createError.Forbidden("you are not allowed to update account");

    if (Object.keys(req.body).length === 0) throw createError.BadRequest();

    if (req.body.password) {
      req.body.password = cryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    const { password, ...info } = updateUser._doc;
    res.status(200).json(info);
  } catch (err) {
    next(err);
  }
});
//DELETE

router.delete("/:id", verify, async (req, res, next) => {
  try {
    if (!(req.user.id === req.params.id || req.user.isAdmin))
      throw createError.Forbidden("you are not allowed to delete account");

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ status: "ohk" });
  } catch (err) {
    next(err);
  }
});
//GET ONE USER

router.get("/find/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw createError.NotFound("user not found");

    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (err) {
    next(err);
  }
});
//GET ALL USER

router.get("/", verify, async (req, res, next) => {
  try {
    if (!req.user.isAdmin) throw createError.Forbidden();
    const query = req.query.new;
    const user = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

//GET USER STATITICS
router.get("/stat", async (req, res, next) => {
  const today = new Date();
  const lastYear = today.setFullYear(today.getFullYear() - 1);
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
