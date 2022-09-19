const express = require("express");
const { login, logout } = require("../../controllers/user/loginControler");
const router = express.Router();


// login
router.post("/",login);
// logout
router.delete("/",logout);
module.exports = router;