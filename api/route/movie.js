const router = require("express").Router();
const Movie = require("../models/Movie");
const createError = require("http-errors");
const verify = require("../verifyToken");

//Create new Movie

router.post("/", verify, async (req, res, next) => {
  try {
    if (!req.user.isAdmin) throw createError.Forbidden();

    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    res.status(200).json(savedMovie);
  } catch (err) {
    next(err);
  }
});

//update
router.put("/:id", verify, async (req, res, next) => {
  try {
    if (!req.user.isAdmin) throw createError.Forbidden();
    const updateMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateMovie);
  } catch (err) {
    next(err);
  }
});

//delete
router.delete("/:id", verify, async (req, res, next) => {
  try {
    if (!req.user.isAdmin) throw createError.Forbidden();

    await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "ohk" });
  } catch (err) {
    next(err);
  }
});

//get movie

router.get("/find/:id", verify, async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (err) {
    next(err);
  }
});

//get random movie
router.get("/random", verify, async (req, res, next) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(movie);
  } catch (err) {
    next(err);
  }
});

//get all movie or series or both
router.get("/", verify, async (req, res, next) => {
  try {
    if (!req.user.isAdmin) throw createError.Forbidden();
    const type = req.query.type;
    let movie;
    if (type === "series") {
      movie = await Movie.find({ isSeries: true });
    } else if (type === "movie") {
      movie = await Movie.find({ isSeries: false });
    } else {
      movie = await Movie.find();
    }
    res.status(200).json(movie.reverse());
  } catch (err) {
    next(err);
  }
});

module.exports = router;
