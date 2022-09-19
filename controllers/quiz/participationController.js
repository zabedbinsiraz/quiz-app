const Participant = require("../../models/Participant");

const createParticipation = async (req, res) => {
  const newParticipant = new Participant({ ...req.body });
  try {
    const result = await newParticipant.save();
    res.status(200).json({
      data: result,
      message: "participant created successfully",
    });
  } catch (error) {
    res.status(500).send("there was an server side error");
  }
};
const participations = async (req, res) => {
  try {
    const result = await Participant.find();
    res.status(200).json({
      data: result,
      message: "participants get successfully",
    });
  } catch (error) {
    res.status(500).send("there was an server side error");
  }
};
const singleParticipation = async (req, res) => {
  try {
    const participations = await Participant.findOne({ _id: req.params.id });
    res.status(200).json({
      data: participations,
      message: "participant get successfully",
    });
  } catch (error) {
    res.status(500).send("there was an server side error");
  }
};

module.exports = { createParticipation, participations, singleParticipation };
