const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();

mongoose
  .connect("mongodb://localhost:27017/_mob", {
//   .connect("mongodb+srv://bruce:bruce@cluster0.exmgv.mongodb.net/_mob", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongoose connected successfully.");
  })
  .catch((error) => {
    console.log(`I got an error! ${error}`);
  });

  // Import controllers
const authController = require('./controllers/authController');
const voteController = require('./controllers/voteController');



// Middleware for JSON body parsing
app.use(express.json());

// Middleware for user authentication
const authenticateUser = (req, res, next) => {
const token = (req.headers.authorization).substr(7);
if(!token){
    return res.status(401).json({error:"Unauthorized!"});
}
try{
    const decodedToken = jwt.verify(token,'secret_key');
    req.user = decodedToken;    
    next()
}
catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: 'Invalid token' });
    } else {
      console.error('Error verifying token:', error);
      res.status(500).json({ error: 'An error occurred' });    
  }
}
}
const votes= require('./models/Vote')
// Routes
app.post('/register', authController.register);
app.post('/login', authController.login);
app.use('/votes/:option', authenticateUser);
app.post('/votes/:option',voteController.createVote)
app.use('/votes',authenticateUser)
app.get('/votes',voteController.showVotes)
app.post('/votes',authenticateUser,voteController.savingOptions)
// app.post('/votes/:option', authenticateUser, voteController.createVote);
app.delete('/votes',async(req,res)=>{
await votes.deleteMany();
res.send('deleted successfully!');
})

// set listeners

const port = 4500;

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
