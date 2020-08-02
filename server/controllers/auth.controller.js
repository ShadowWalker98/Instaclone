var User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const bcrypt = require('bcrypt');

const signin = async (req, res) => {
    try {
      let user = await User.UserSchema.findOne({
        "email": req.body.email
      })
  
      if (!user)
        return res.status('401').json({
          error: "User not found!"
        })
      let salt = 10;
      let hashed_password = bcrypt.hashSync(req.body.password, salt);
      console.log(hashed_password,user.password);
      if (!(hashed_password === user.password)) {
        return res.status('401').send({
          error: "Password is incorrect!"
        })
      }
      
      const jwtSecret = process.env.JWT_SECRET || "10";
      const token = jwt.sign({
                _id: user._id
            }, jwtSecret)
  
      res.cookie("t", token, {
        expire: new Date() + 9999
      })
  
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
    res.clearCookie("t")
    return res.status('200').json({
      message: "signed out"
    })
  }

  module.exports = {
    signin,
    signout
};