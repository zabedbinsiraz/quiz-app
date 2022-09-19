const Question = require("../../models/Question");
const Quiz = require("../../models/Quiz")

//create question 
const createQuestion = async (req,res) =>{
    const newQuestion = new Question({
        ...req.body,
        quiz:req.quizId,
    });
    try {
        
       const question = await newQuestion.save();
        await Quiz.updateOne({_id:req.quizId},{
            $push:{questions:question._id}
        },{overwrite:false});
        res.status(201).json({
            message:"question created successfully"
        })
    } catch (error) {
        res.status(500).send("server side error");
        
    }
    
}

//delete question
const deleteQuestion = async (req,res)=>{
    try {
    await Question.deleteOne({_id:req.params.id});
    res.status(200).json({message:'question deleted successfully'})
    } catch (error) {
        res.status(500).json({
            error:'server errors'
        })
    }
  
  }
module.exports = {createQuestion,deleteQuestion}