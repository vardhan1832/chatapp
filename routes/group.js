const express = require('express')
const groupController = require('../controller/group')
const userauthentication = require('../middleware/auth')
const router = express.Router();

router.post('/group',userauthentication.authentication,groupController.postGroup)
router.get('/groups',userauthentication.authentication,groupController.getGroup)
router.get('/group/chat',userauthentication.authentication,groupController.getGroupChat)
router.get('/user/group/:usermail',userauthentication.authentication,groupController.getuser)
router.delete('/user/group/remove/:userid',userauthentication.authentication,groupController.removeUser)
router.use('/user/group/admin/:userid',userauthentication.authentication,groupController.updateUserAdmin)


module.exports = router;