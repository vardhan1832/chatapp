const express = require('express')
const signinController = require('../controller/user')
const router = express.Router();

router.post('/sign-up',signinController.postUserDetails)

module.exports = router;