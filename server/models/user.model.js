const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required!',
    },
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },
    // password
    password: {
        type: String,
        trim: true,
        required: true
        //add validation for password
    },
    // imagePath
    imagePath: {
        type: String,
        trim: true,
        default: ''
    },
    // bio
    bio: {
        type: String,
        trim: true,
        default: ''
    },
    // followers list
    followers: [
        { type: mongoose.Schema.ObjectId, ref: "User" }
    ],
    // following list
    following: [
        { type: mongoose.Schema.ObjectId, ref: "User" }
    ]
});
module.exports = {
    UserSchema: mongoose.model('User', UserSchema)
}
