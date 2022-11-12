const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
    fullname:{
        type:String,
        required: 'fullname required',
    },
    email :{
        type: String,
        required: 'email required and unique',
        unique: true
    },
    
    password :{
        type: String,
        required: 'passwor is required',
    }
},{skipVersioning:false});

module.exports = mongoose.model('logins',Schema)