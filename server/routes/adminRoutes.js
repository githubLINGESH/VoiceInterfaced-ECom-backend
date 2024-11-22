const router = require('express').Router();
const AdminController = require('../controller/adminContoller');

//router.get('/get-res', LlmController.getRecommendations);
router.get('/get-requests', AdminController.getRequests);
router.post('/update-request', AdminController.updateRequest);

module.exports = router;