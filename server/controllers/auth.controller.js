var User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const bcrypt = require('bcrypt');

const signin = async (req, res) => {
    // finding user in db
    try {
      let user = await User.UserSchema.findOne({
        "email": req.body.email
      })

      if (!user)
        // if user isnt found in db, send an error back
        return res.status('401').json({
          error: "Username or password is incorrect!1"
        });
      // if they exist continue:

      // comparing password with user password
      let isCorrectPass = bcrypt.compareSync(req.body.password, user.password);

      if (!isCorrectPass) {
        // if password is incorrect, send an error back to the client
        return res.status('401').send({
          error: "Username or password is incorrect!2"
        });
      }
      // retreiving jwt secret from dotenv file
      const jwtSecret = process.env.JWT_SECRET || "10";
      // creating signin token
      const token = jwt.sign({
                _id: user._id
            }, jwtSecret);
      // sending a cookie back in response
      res.cookie("t", token, {
        expire: new Date() + 9999
      });
      // returning token and user data

      return res.json({
        token,
        user: {_id: user._id, name: user.name, email: user.email}
      })
    } catch (err) {
      console.log(err)
      return res.status('401').json({
        error: "Could not sign in"
      })
    }
  }

  const signout = (req, res) => {
    // TODO: change the signout method to use tokens instead of cookies
    // clearing cookie
    res.clearCookie("t")
    return res.status('200').json({
      message: "signed out 🤗🤗"
    });
  }

  module.exports = {
    signin,
    signout
};
// wait lets try to sign out when we aren't signed in
// we will add requiresignin for signout ok but how