const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  totalOptions: {
    type: String,
    required: true,
  },
  options: [{}],
  totalAnswers: {
    type: String,
    required: true,
  },
  answers: [{}],
  quiz: {
    type: mongoose.Types.ObjectId,
    ref: "Quiz",
  },
});

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
