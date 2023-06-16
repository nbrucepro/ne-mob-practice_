const Vote = require('../models/Vote');

const savingOptions = async(req,res) => {
    const {option} = req.body;
    const savedOption = new Vote({option});
    await savedOption.save();
    res.status(201).json({message:"Option to vote saved successfully!"});
}
const createVote = async (req, res) => {
    const { option } = req.params;
    const { userId } = req.user;
     
    try{
        const existingVote = await Vote.findOne({option, userId});
        if(existingVote){
            return res.status(400).json({error: 'You have already voted for this option'})
        }
        const vote = await Vote.findOneAndUpdate({option},
            {$inc:{count:1},userId},
            {new:true,upsert:true}
            )
    }
    catch(error){
        console.error('Error creating vote:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
}
module.exports = createVote;