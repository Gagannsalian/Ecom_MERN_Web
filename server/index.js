const express = require('express');
const cors = require('cors');

require('./Database/config');
const User = require("./Database/User")
const app = express();


//midleware
app.use(express.json())
app.use(cors());




app.post("/register", async (req,res)=>{
    let user = new User(req.body);
    const result = await user.save();

    res.send(req.body);
})



PORT = 8082;

app.listen(PORT, ()=>{  console.log(`Server Running in PORT : ${PORT}`);
})