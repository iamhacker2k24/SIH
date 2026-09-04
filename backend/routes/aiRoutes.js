const express = require('express');
const router = express.Router();
const { getAiAdvisory } = require('../controllers/aiController');

router.post('/advisor', getAiAdvisory);

module.exports = router;
