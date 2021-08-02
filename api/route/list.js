const router = require("express").Router();
const createError = require("http-errors");
const verify = require("../verifyToken");
const List = require("../models/List");

//CREATE
router.post("/", verify, async (req, res, next) => {
  try {
    if (!req.user.isAdmin) throw createError.Forbidden();
    const newList = new List(req.body);
    const savedList = await newList.save();
    res.status(200).json(savedList);
  } catch (err) {
    next(err);
  }
});
//DELETE

router.delete("/:id", verify, async (req, res, next) => {
  try {
    if (!req.user.isAdmin) throw createError.Forbidden();
    await List.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "ohk" });
  } catch (err) {
    next(err);
  }
});

//UPDATE
router.put("/:id", verify, async (req, res, next) => {
  try {
    if (!req.user.isAdmin) throw createError.Forbidden();
    const updatedList = await List.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedList);
  } catch (err) {
    next(err);
  }
});
//GET
router.get("/", verify, async (req, res, next) => {
  const type = req.query.type;
  const genre = req.query.genre;
  let list = [];
  try {
    if (type) {
      if (genre) {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: type, genre: genre } },
        ]);
      } else {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: type } },
        ]);
      }
    } else {
      list = await List.aggregate([{ $sample: { size: 10 } }]);
    }
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
});

router.get("/find/:id", verify, async (req, res, next) => {
  try {
    const list = await List.findById(req.params.id);
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
