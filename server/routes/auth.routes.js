const express = require('express')
const { signin, signout} = require('../controllers/auth.controller');

const router = express.Router()

router.route('/signin')
  .post(signin)
router.route('/signout')
  .get(signout)

module.exports = router;