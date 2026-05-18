const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const auth = require('../middleware/auth');

router.post('/recommend', auth, aiController.getRecommendation);

module.exports = router;
