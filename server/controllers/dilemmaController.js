// controllers/dilemmaController.js

const Dilemma = require("../models/Dilemma");
const DilemmaResponse = require("../models/DilemmaResponse");

const postDilemma = async (req, res) => {
  try {
    const { title, scenario, options } = req.body;
    const newDilemma = new Dilemma({ title, scenario, options });
    await newDilemma.save();
    res.status(201).json(newDilemma);
  } catch (err) {
    res.status(500).json({ message: "Error posting dilemma", error: err.message });
  }
};

const getLatestDilemma = async (req, res) => {
  try {
    const dilemma = await Dilemma.findOne().sort({ createdAt: -1 });
    res.status(200).json(dilemma);
  } catch (err) {
    res.status(500).json({ message: "Error fetching dilemma", error: err.message });
  }
};

const submitDilemmaResponse = async (req, res) => {
  try {
    const { dilemmaId, userId, chosenOptionIndex, reasoning } = req.body;
    const response = new DilemmaResponse({
      dilemmaId,
      userId,
      chosenOptionIndex,
      reasoning,
    });
    await response.save();
    res.status(201).json({ message: "Response submitted", response });
  } catch (err) {
    res.status(500).json({ message: "Error submitting response", error: err.message });
  }
};

module.exports = { postDilemma, getLatestDilemma, submitDilemmaResponse };
