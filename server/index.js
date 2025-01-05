const express = require('express');
const mongoose = require('mongoose');

const app = express();

// app.get('/Sample', (req,res)=>{
//     res.send("app is working");
// })


const connectDB = async()=>{
    mongoose.connect('mongodb://localhost:27017/e-commerce');

    const productSchema = new mongoose.Schema({ })
    const product = mongoose.model('product', productSchema);

    const data = await product.find();
    console.log(data);
}
connectDB();

PORT = 8082;

app.listen(PORT, ()=>{
    console.log(`Server Running in PORT : ${PORT}`);
})