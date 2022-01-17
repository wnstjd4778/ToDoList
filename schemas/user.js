const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    email = {
        type: String,
        required: true,
        unique: true
    },
    nickName = {
        type: String,
        required: true,
        unique: true
    },
    
    snsType = {
        type: String,
        required: true
    },
    snskey = {
        type: String,
        required:true,
        unique: true
    }
});


module.exports = mongoose.model('User', userSchema);