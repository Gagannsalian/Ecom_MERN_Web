const express = require('express');

const app = express();

app.get('/Sample', (req,res)=>{
    res.send("app is working");
})

PORT = 8082;

app.listen(PORT, ()=>{
    console.log(`Server Running in PORT : ${PORT}`);
})