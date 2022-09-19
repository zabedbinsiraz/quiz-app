const express = require("express");
const {
  createTransaction,
  getTransaction,
  updateTransaction,
} = require("../../controllers/user/transactionController");
const {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
} = require("../../controllers/user/userController");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../../middlewares/users/userValidator");
const router = express.Router();

//get users
router.get("/", getUser);

//get user
router.get("/:id", getSingleUser);

//update user
router.put("/:id", updateUser);
//delete user
router.delete("/:id", deleteUser);

// delete user
// router.delete("/:id",deleteUser);

//create user
router.post("/", addUserValidators, addUserValidationHandler, createUser);
//create transaction
router.post("/transaction", createTransaction);
// get a transaction
router.get("/transaction/:id", getTransaction);
// update a transaction
router.put("/transaction/:id", updateTransaction);
module.exports = router;
