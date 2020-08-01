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
    // remaining fields:
    // password
    password: {
        type: String,
        trim: true,
        //add validation for password
    }
    // imagePath
    // bio
    // followers list
    // following list

});
module.exports = {
    UserSchema: mongoose.model('User', UserSchema)
}
// export default mongoose.model('User', UserSchema);