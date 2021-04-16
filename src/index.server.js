const express = require('express');
const app = express();
const env = require('dotenv');
const mongoose = require('mongoose');
const path = require('path')


//routes

const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');

//env config
env.config();

//mongodb config

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology:true,
    useFindAndModify: false,
}).then(()=>{
    console.log('connected successfully')
}).catch((err)=>{
    console.log(err)
});


//middleware

app.use(express.json());
app.use('/public',express.static(path.join(__dirname,'uploads')));
app.use('/api',categoryRoutes)
app.use('/api',authRoutes)


//server runing

app.listen(process.env.PORT, () => {
    console.log(`server running on port:${process.env.PORT}`);
})
