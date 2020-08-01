var User = require('../models/user.model')
//create user
const createUser = async (req,res) => {
    let UserModelCreator = User.UserSchema;
    console.log(req.body);
    const user = new UserModelCreator(req.body.user);
    try {
        user.save();
        // thats it?
        return (res.status(200));
    }
    catch(e) {
        console.log(e);
    }
}
module.exports = {
    createUser
};
