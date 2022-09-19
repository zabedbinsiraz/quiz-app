const User = require("../../models/People");
const bcrypt = require("bcrypt");

//create user
const createUser = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = new User({
    ...req.body,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res.status(200).json({
      message: "User was added successfully!",
    });
  } catch (err) {
    res.status(500).json({
      error: {
        message: "Unknown error occured!",
      },
    });
  }
};

// get all users
const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      result: users,
      message: "users get successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: "there was a server side error",
      },
    });
  }
};

//get a user
const getSingleUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    res.status(200).json({
      result: user,
      message: "user get successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "there was a server side error",
    });
  }
};

// update a user
const updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      {
        returnOriginal: false,
      }
    );
    res.status(200).json({
      data: user,
      message: "user updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "server errors",
    });
  }
};

// delete user
const deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    res.status(500).json({
      error: "server errors",
    });
  }
};

module.exports = { createUser, getUser, getSingleUser, updateUser, deleteUser };
