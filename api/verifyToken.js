const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const verify = (req, res, next) => {
  try {
    const authHeader = req.headers.token;
    if (!authHeader) throw createError.BadRequest();

    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if (err) throw createError.Unauthorized();
      req.user = payload;
      next();
    });
  } catch (err) {
    next(err);
  }
};

module.exports = verify;
