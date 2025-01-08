const express = require("express");
const cors = require("cors");

require("./Database/config");
const User = require("./Database/User");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Register Route
app.post("/register", async (req, res) => {
  try {
    let user = new User(req.body);
    let result = await user.save();  // Change const to let
    result = result.toObject();  // Reassigning the result object
    delete result.password;  // Don't send the password
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error registering user" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    if (req.body.email && req.body.password) {  // Ensure both email and password are provided
      let user = await User.findOne({ email: req.body.email, password: req.body.password }).select("-password");

      if (user) {
        res.send(user);  // Send user data (excluding password)
      } else {
        res.status(400).send({ result: "No user found" });  // Return error if user is not found
      }
    } else {
      res.status(400).send({ result: "Email and password are required" });  // Handle missing fields
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error logging in" });
  }
});

const PORT = 8082;

app.listen(PORT, () => {
  console.log(`Server Running in PORT : ${PORT}`);
});
