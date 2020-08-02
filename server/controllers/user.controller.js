var User = require('../models/user.model')
const bcrypt = require('bcrypt');
//create user
const createUser = async (req,res) => {
    let UserModelCreator = User.UserSchema;
    console.log(req.body);
    // added hashing password with bcrypt with salt value as 10
    let data = req.body.user.password;
    let salt = 10
    req.body.user.password = bcrypt.hashSync(data, salt);
    const user = new UserModelCreator(req.body.user);
    try {
        // added await to this call
        //we need to add something to not allow duplicate values
        var result = await user.save();
        // sending the stored result back to the client
        res.send(result);
    }
    catch(e) {
        console.log(e);
    }
}
module.exports = {
    createUser
};

