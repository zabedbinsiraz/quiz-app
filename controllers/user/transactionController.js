const Transaction = require("../../models/Transaction");

const createTransaction = async (req, res) => {
  const newTransaction = new Transaction({
    ...req.body,
    user: req.userId,
  });
  try {
    const result = await newTransaction.save();
    res.status(200).json({
      data: result,
      message: "transaction created successfully",
    });
  } catch (error) {
    res.status(500).send("there was an server side error");
  }
};

// get transaction
const getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({ user: req.params.userId });
    res.status(200).json({
      data: transaction,
      message: "participant get successfully",
    });
  } catch (error) {
    res.status(500).send("there was a server side error");
  }
};

const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      {
        returnOriginal: false,
      }
    );

    res.status(200).json({
      data: transaction,
      message: "transaction updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "server errors",
    });
  }
};

module.exports = { createTransaction, getTransaction, updateTransaction };
