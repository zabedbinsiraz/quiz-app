const mongoose = require("mongoose");

const quizSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    quizName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },

    quizType: {
      type: String,
      enum: ["free", "paid"],
      default: "free",
    },
    totalQuestion: {
      type: Number,
      default: 10,
    },
    submitSystem: {
      type: String,
      enum: ["Single Answer", "All Answer"],
      default: "All Answer",
    },
    ansShow: {
      type: String,
      enum: ["quiz submit", "retake complete"],
      default: "retake complete",
    },
    retake: {
      type: Number,
      default: 1,
    },
    quizTime: {
      type: Number,
      default: 10,
    },
    questionTime: {
      type: Number,
      default: 1,
    },
    price:Number,
    questions: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Question",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
