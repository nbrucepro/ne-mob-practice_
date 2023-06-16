const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req,res) => {
    const {email,password} = req.body;

    try{
        const hashedPassword = await bcrypt.hash(password,10);
        console.log(hashedPassword);
        const user = new User({email,password:hashedPassword});
        await user.save();
        res.status(201).json({message:"User registered successfully!", user })
    }
    catch(error){
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
}

const login = async (req,res) => {
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        console.log(user);
        console.log(password);
        const passwordMatch = await bcrypt.compare(password,user.password);
        if(!passwordMatch){
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const token = jwt.sign({userId:user._id}, 'secret_key');
        res.json({token});
    }
    catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'An error occurred' });
      }
}

module.exports = {
    register,
    login
}