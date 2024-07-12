const express = require('express');
const router = express.Router();
const chatHistoryController = require('../controller/chatHistoryController');

router.post('/addchats', chatHistoryController.AddChats);
router.get('/getchats', chatHistoryController.getChats);

module.exports = router;