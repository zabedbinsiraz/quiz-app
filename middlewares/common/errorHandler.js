const createError = require("http-errors");

// 404 not found handler
function notFoundHandler(_req, _res, next) {
  next(createError(404, "Your requested page not found"));
}

// default error handler
function errorHandler(err, _req, res, _next) {
   const error = process.env.NODE_ENV === "development" ? err : { message: err.message };

    res.status(err.status || 500).json(error);
}
 
module.exports = {
  notFoundHandler,
  errorHandler,
};
