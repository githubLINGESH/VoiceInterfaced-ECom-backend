    // server/models/user.model.js
    const mongoose = require('mongoose');

    const userSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    });

    const User = mongoose.model('User', userSchema);

    module.exports = User;
