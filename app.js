//external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

//internal imports
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");
const userRouter = require("./router/user/userRouter");
const quizRouter = require("./router/quiz/quizRouter");
const authRouter = require("./router/user/authRouter");

//app config
const app = express();
dotenv.config();

// database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connection successful"))
  .catch((err) => console.log(err));

// request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, "public/uploads/images")));

// routing set up
app.use("/user", userRouter);
app.use("/quiz", quizRouter);
app.use("/auth", authRouter);

//checkup rout
app.use("/health", (_req, res) => {
  res.send("This app is runnig successfully");
});
//error handling
// not found handler
app.use(notFoundHandler);
//error handler
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
