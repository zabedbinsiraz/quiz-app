const mongoose = require("mongoose");

const transactionShema = mongoose.Schema({
    balance:{
        type:Number,
        default:500,
    },
    transaction:Number,
    refund:Number,
    user:mongoose.Types.ObjectId,

})
const Transaction = mongoose.model("Transaction",transactionShema);
module.exports = Transaction;