const express = require('express')
const groupController = require('../controller/group')
const userauthentication = require('../middleware/auth')
const router = express.Router();

router.use('/group',userauthentication.authentication,groupController.postGroup)
router.use('/groups',userauthentication.authentication,groupController.getGroup)


module.exports = router;