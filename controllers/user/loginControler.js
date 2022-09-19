// external imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

// internal imports
const User = require("../../models/People");

// login user
async function login(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (isValidPassword) {
        const userObject = {
          userId: user._id,
          email: user.email,
          role: user.role || "user",
        };
        const token = jwt.sign(userObject, process.env.JSON_SECRET, {
          expiresIn: "1h",
        });
        req.body.user = userObject;
        res.status(200).json({
          data: req.body.user,
          json_token: token,
          message: "Login successfull",
        });
      } else {
        res.status(401).json({
          error: "authentication failed1",
        });
      }
    } else {
      res.status(401).json({ error: "authentication failed2" });
    }
  } catch (error) {
    res.status(401).json({ err: "authentication failed3" });
  }
}

// do logout
function logout(req, res) {
  res.clearCookie(process.env.COOKIE_NAME);
  res.send("logged out");
}

module.exports = {
  login,
  logout,
};
