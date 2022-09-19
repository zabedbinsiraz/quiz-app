const mongoose = require("mongoose");

const participantSchema = mongoose.Schema({
  user: mongoose.Types.ObjectId,
  quiz: mongoose.Types.ObjectId,
  payment: Number,
  marks: Number,
  quizTime: {
    type: String,
    enum: ["free", "paid"],
    default: "free",
  },
});
const Participant = mongoose.model("Participant", participantSchema);
module.exports = Participant;
