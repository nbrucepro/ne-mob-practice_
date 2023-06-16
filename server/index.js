const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();

mongoose
  .connect("mongodb+srv://bruce:bruce@cluster0.exmgv.mongodb.net/_mob", {
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


// Middleware for JSON body parsing
app.use(express.json());

// Routes
app.post('/register', authController.register);
app.post('/login', authController.login);

// set listenersconst voteController = require('./controllers/voteController');


const port = 4500;

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
