const express = require('express')
const signinController = require('../controller/user')
const loginController = require('../controller/login')
const router = express.Router();

router.post('/sign-up',signinController.postUserDetails)
router.post('/login', loginController.login)

module.exports = router;