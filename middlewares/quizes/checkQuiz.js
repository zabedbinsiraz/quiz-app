const Quiz = require("../../models/Quiz");

const checkQuiz = async(req,res,next)=>{
    try {
        const quiz =await Quiz.findOne({id:req.body.id});
        req.quizId=quiz._id;
    next()
    } catch (error) {
        res.status(500).send("There was a server error")
    }
}
module.exports = {checkQuiz}