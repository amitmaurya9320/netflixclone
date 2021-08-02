const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const authRoute = require("./route/auth");
const createError = require("http-errors");
const userRoute = require("./route/user");
const movieRoute = require("./route/movie");
const listRoute = require("./route/list");
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("mongoDB connected"))
  .catch((err) => console.log(err));
app.use(express.json());
//auth route
app.use("/api/auth", authRoute);

//user route
app.use("/api/users", userRoute);

//movie route
app.use("/api/movies", movieRoute);

//list route
app.use("/api/lists", listRoute);

app.use(async (req, res, next) => {
  next(createError.NotFound("this route does not exist"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(5000, () => {
  console.log("server is running");
});
