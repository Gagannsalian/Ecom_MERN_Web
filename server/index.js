const express = require("express");
const cors = require("cors");

require("./Database/config");
const User = require("./Database/User");
const app = express();

//midleware
app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  const result = await user.save();
  result = result.toObject();
  delete result.password;
  res.send(result);

  // res.send(req.body);
});

app.post("/login", async (req, res) => {
  if (req.body.password && req.res.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
    } else {
      res.send({ result: "no user found" });
    }
  }
});

PORT = 8082;

app.listen(PORT, () => {
  console.log(`Server Running in PORT : ${PORT}`);
});
