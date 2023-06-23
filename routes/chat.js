const express = require('express')
const chatController = require('../controller/chat')
const userauthentication = require('../middleware/auth')
const router = express.Router();

router.use('/user/chat',userauthentication.authentication,chatController.postChat)

module.exports = router;