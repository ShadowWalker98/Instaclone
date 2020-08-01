const CreateUser = require('../controllers/user.controller')
// const { Router } = require('express')
const express = require('express')
const router = express.Router();
// still should work na
router.post('/',CreateUser.createUser);

module.exports = router;


