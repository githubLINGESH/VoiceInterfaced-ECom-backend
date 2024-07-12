const express = require('express');
const router = express.Router();
const userContextController = require('../controller/userContextController');

// Define routes
router.post('/usercontext', userContextController.AddUserContext);
router.put('/usercontext/:id', userContextController.updateUserContext);

module.exports = router;
