const Vote = require("../models/Vote");
const Option = require("../models/Option");

const savingOptions = async (req, res) => {
  const { name } = req.body;
  const savedOption = new Option({ name })
  await savedOption.save();
  res.status(201).json({ message: "Option to vote saved successfully!" });
};

const createVote = async (req, res) => {
  const { option } = req.params;
  const { userId } = req.user;

  try {
      const isOption = await Option.findOne({name:option})
      console.log(isOption)
      if(!isOption){
          return res.status(400).json({message:"what you're voting is not there!"})
        }
        const existingVote = await Vote.findOne({ userId });
    // const existingVote = await Vote.findOne({ option, userId });
    if (existingVote) {
      return res
        .status(400)
        .json({ error: "You have already voted" });
    }
    const optId =(isOption._id).toString();
    console.log(optId);
    const vote = await Vote.findOneAndUpdate(
      { option: optId },
      { $inc: { count: 1 }, $push:{userId} },
      { new: true, upsert: true }
    );
    res.status(201).json({vote})
  } catch (error) {
    console.error("Error creating vote:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const showVotes = async (req,res) => {
    const votes = await Vote.find();
    console.log(votes)
    res.status(200).json({votes});
}
module.exports = {createVote,showVotes,savingOptions};
