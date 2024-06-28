const router = require('express').Router();
const LlmController = require('../controller/LlmController');

//router.get('/get-res', LlmController.getRecommendations);
router.post('/prompted-res', LlmController.PromptResponse);

module.exports = router;