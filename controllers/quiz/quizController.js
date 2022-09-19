const Quiz = require("../../models/Quiz");
const {unlink} = require('fs');
const path = require('path');

//create a quiz
const createQuiz = async(req,res)=>{
    console.log('from create quiz')
    console.log(req.body)
    console.log(req.files)
    const newQuiz = new Quiz({
        ...req.body,
        image:req.files[0].filename
      
    });
    console.log(newQuiz);
    try {
        await newQuiz.save();
        res.status(201).json({
            id:req.body.id,
            message:"quiz created successfully"
        })
    } catch (error) {
        if (req.files.length > 0) {
            const { filename } = req.files[0];
            unlink(
              path.join(__dirname, `/../public/uploads/images/${filename}`),
              (err) => {
                if (err) console.log(err);
              }
            );
          }
        console.log(error)
        res.status(500).send("server side error")
    }
}
// get all quizes
const getQuiz = async(req,res)=>{
    try {
        const quizes =await Quiz.find().populate("questions","question options answers -_id");
        res.status(200).json({
            data:quizes,
            message:"quizes get successfully"
        })
    } catch (error) {
        res.status(500).json({
            error:"there was a server side error"
        })
    }
}

//get a quiz
const getSingleQuiz = async(req,res)=>{
    try {
        const quiz =await Quiz.findOne({_id:req.params.id}).populate("questions","question options answers -_id");
        res.status(200).json({
            data:quiz,
            message:"quiz get successfully"
        })
    } catch (error) {
        res.status(500).json({
            error:"there was a server side error"
        })
    }
}

// update a quiz
const updateQuiz = async (req,res)=>{
    try {
        const quiz = await Quiz.findOneAndUpdate({_id:req.params.id},{...req.body},{
            returnOriginal: false
        });

    
    res.status(200).json({
        data:quiz,
        message:'quiz updated successfully'})
    } catch (error) {
        res.status(500).json({
            error:'server errors'
        })
    }
}


// deleteQuiz
const deleteQuiz = async (req,res)=>{
    try {
    await Quiz.deleteOne({_id:req.params.id});
    res.status(200).json({message:'quiz deleted successfully'})
    } catch (error) {
        res.status(500).json({
            error:'server errors'
        })
    }

}



module.exports = {createQuiz ,getQuiz,getSingleQuiz, updateQuiz,deleteQuiz};