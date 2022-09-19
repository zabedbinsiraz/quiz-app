const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const checkLogin = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JSON_SECRET);
    const { email, role, userId } = decoded;
    req.id = userId;
    (req.email = email), (req.role = role), console.log("from role auth");
    next();
  } catch (error) {
    next("Authentication Failure");
  }
};

function requireRole(role) {
  return function (req, res, next) {
    if (req.role && role.includes(req.role)) {
      console.log("from role auth");
      next();
    } else {
      res.status(401).json({
        errors: {
          common: {
            msg: "You are not authorized!",
          },
        },
      });
    }
  };
}
module.exports = { checkLogin, requireRole };
