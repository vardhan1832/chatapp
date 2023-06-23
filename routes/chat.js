const express = require('express')
const chatController = require('../controller/chat')
const userauthentication = require('../middleware/auth')
const router = express.Router();

router.use('/user/chat',userauthentication.authentication,chatController.postChat)
router.use('/user/chats',userauthentication.authentication,chatController.getChat)

module.exports = router;