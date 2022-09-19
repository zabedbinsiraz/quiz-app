const express = require("express");
const { createParticipation, allParticipations, singleParticipation, participations } = require("../../controllers/quiz/participationController");
const { createQuestion, deleteQuestion } = require("../../controllers/quiz/questionController");
const { createQuiz, getQuiz, getSingleQuiz, updateQuiz, deleteQuiz } = require("../../controllers/quiz/quizController");
const { checkLogin, requireRole } = require("../../middlewares/common/checkLogin");
const { checkQuiz } = require("../../middlewares/quizes/checkQuiz");
const imageUpload = require("../../middlewares/quizes/imageUpload");

const router = express.Router();

// all quizzes routes here
//get quizes
router.get("/",getQuiz);

//get a quiz
router.get("/:id",getSingleQuiz);

//create quiz
router.post("/",checkLogin,requireRole(["admin"]),imageUpload,createQuiz);

//update a quiz
router.put("/:id",updateQuiz);
// delete a quiz
router.delete("/:id",deleteQuiz)


//question routes
//create question
router.post("/question",checkQuiz,createQuestion)
// delete question
router.delete("/question/:id",deleteQuestion);


//participation routes
//create participation
router.post("/user/participation",createParticipation);
//get participation
router.get("/user/participation",participations);
//get single participation
router.get("/user/participation/:id",singleParticipation);

module.exports = router;