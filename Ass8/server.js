const express = require('express');

const mongoose = require('mongoose');

const bodyPraser = require('body-parser');
const routes = require('./api/routes/routes');

const app = express();

app.use(bodyPraser.urlencoded({extended:true}));
app.use(bodyPraser.json());

const port = 8080;

mongoose.connect('mongodb://localhost:27017/usersLoginDB',{

    useNewUrlParser: true,
    useUnifiedTopology: true

}, (error) => {
    if (!error) {
        console.log("connected to db");
    }
    else {
        console.log("error in connecting to DB");
    }
});

mongoose.connection.on('connected',function(){
    console.log("database connected successfully");
})


routes(app);

app.listen(port, ()=>{
    console.log(`server is running on ${port}.`);
})











